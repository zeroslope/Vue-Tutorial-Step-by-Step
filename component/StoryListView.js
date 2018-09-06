const StoryListView = Vue.component('story-list-view', {
    template: `
    <div>
        <div class="w-100 bg-white fixed top3rem">
            <div class="center pa2 mw5 tc">
                <router-link 
                    v-if='page > 1' 
                    :to="'/' + storyState + '/' + (page - 1)" 
                    class="no-underline pa2">
                    &lt; prev
                </router-link>
                <a v-else class="disabled no-underline pa2">&lt; prev</a>

                <span>{{ page }}/{{ maxPage }}</span>

                <router-link 
                    v-if="hasMore" 
                    :to="'/' + storyState + '/' + (page + 1)" 
                    class="no-underline pa2">
                    more &gt;
                </router-link>
                <a v-else class="disabled no-underline pa2">more &gt;</a>
            </div>
        </div>
        <div class="overflow-hidden mw7 center pt4 mt3">
            <story-card
                v-for="story in displayList"
                v-if="!!story"
                :key="story.id"
                :story="story"
            ></story-card>
        </div>
    </div>
    `,
    props: {
        storyState: String
    },
    data() {
        return {
            apiData: [],
            itemsPerPage: 20,
            displayList: []
        }
    },
    computed: {
        page() {
            return Number(this.$route.params.page) || 1
        },
        maxPage() {
            if (this.apiData.length > 0) {
                return Math.ceil(this.apiData.length / this.itemsPerPage )
            } else {
                return 1
            }
        },
        hasMore() {
            return this.page < this.maxPage
        }
    },
    watch: {
        page(to, from) {
            this.loadItems(to, from)
        }
    },
    created() {
        getStories(this.storyState)
        .then(val => {
            return this.getStoriesItem(val)
        })
        .then(data => {
            this.apiData = data
            this.loadItems(this.page)
        })
    },
    methods: {
        getStoriesItem(stories) {
            return Promise.all(stories.map(id => getItem(id)))
        },
        loadItems(to = this.page, from = -1){
            if(this.page < 0 || this.page > this.maxPage){
                this.$router.replace(`/${this.storyState}/1`)
                return
            }
            let itemsPerPage = this.itemsPerPage
            this.displayList = this.apiData.slice((this.page-1)*itemsPerPage,  this.page*itemsPerPage)
        }
    }
})