const ArticleView = Vue.component('article-view', {
    template: `
    <div class="center mw7">
        <div class="bg-white overflow-hidden" v-if="!loading">
            <story-card
                :story="story"
            ></story-card>

            <h2 class="f5 pl4 fw4">{{ story.kids.length }} Comments</h2>
            <ul class="list ph4">
                <comments-view
                    v-for="id in story.kids"
                    :id="id"
                    :key="id"
                >
                </comments-view>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            story: {},
            loading: false
        }
    },
    created() {
        this.getItemData(this.$route.params.id)
    },
    watch: {
        '$route' (to, from) {
            this.getItemData(to.params.id)
        }
    },
    methods: {
        getItemData(id) {
            this.story = {}
            this.loading = true
            return getItem(id)
            .then(val => {
                this.story = val
                this.loading = false
            })
        }
    }
})