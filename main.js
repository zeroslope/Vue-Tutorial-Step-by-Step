let app = new Vue({
    el: "#app",
    data: {
        topNewsList: [],
        topNewsData: []
    },
    created() {
        getStories('top')
        .then(val => {
            this.topNewsList = val.slice(0, 20)
            this.getStoriesItem(this.topNewsList)
            .then(data => this.topNewsData = data)
        })
    },
    methods: {
        getStoriesItem(stories) {
            return Promise.all(stories.map(id => getItem(id)))
        }
    }
})