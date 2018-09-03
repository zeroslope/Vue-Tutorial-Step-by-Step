let app = new Vue({
    el: "#app",
    data: {
        state: 'story',
        storyState: 'top',
        apiData: {},
        currentUserData: {}
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
        }
    }
})