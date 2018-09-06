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
    router,
    data: {
        state: 'story',
        storyState: 'top',
        apiData: {},
        currentUserData: {},
        currentArticle: {},
        navAClass: ['dib', 'f6', 'no-underline', 'white', 'pa3', 'ph4-l', 'bg-animate', 'mw7']
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