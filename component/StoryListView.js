const StoryListView = Vue.component('story-list-view', {
    template: `
    <div class="overflow-hidden">
        <story-card
            v-for="story in apiData[storyState]"
            v-if="!!story"
            :key="story.id"
            :story="story"
        ></story-card>
    </div>
    `,
    props: {
        storyState: String
    },
    data() {
        return {
            apiData: {},
        }
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
    }
})