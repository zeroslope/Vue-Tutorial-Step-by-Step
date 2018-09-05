Vue.filter('timeFromNow', function (time) {
    if (!time) return ''
    return moment(time * 1000).fromNow()
})

Vue.filter('host', function (url) {
    if (!url) return ''  
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if(parts[0] === 'www') parts.shift()
    return parts.join('.')
})

let app = new Vue({
    el: "#app",
    data: {
        state: 'story',
        storyState: 'top',
        apiData: {},
        currentUserData: {},
        currentArticle: {},
        navAClass: ['dib', 'f6', 'f5-l', 'link', 'white', 'pa3', 'ph4-l', 'bg-animate', 'hover-bg-mid-gray', 'mw7']
    },
    created() {
        ['top', 'new', 'show', 'ask', 'job'].forEach(storyState => {
            getStories(storyState)
            .then(val => {
                let itemList = val.slice(0, 20)
                this.getStoriesItem(itemList)
                .then(data => this.$set(this.apiData, storyState, data))
            })
        })
    },
    provide: function () {
        return {
            handleUserClick: this.handleUserClick
        }
    },
    methods: {
        getStoriesItem(stories) {
            return Promise.all(stories.map(id => getItem(id)))
        },
        getUserData(userId) {
            return getUser(userId)
            .then(val => {
                this.currentUserData = val
            })
        },
        handleNavClick(e, storyState) {
            this.state = 'story'
            this.storyState = storyState
        },
        handleUserClick(userId) {
            this.currentUserData = {}
            this.getUserData(userId)
            .then(
                this.state = 'user'
            )
        },
        handleCommentClick(story) {
            this.state = 'comments'
            this.currentArticle = story
        }
    }
})