const StoryListView = Vue.component('story-list-view', {
    template: `
    <div class="center mw7 relative shadow-3">
        <div class="bg-white fixed top3rem left-0 right-0 z-5 shadow-5">
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
        <transition :name="transition">
           <div :key="displayPage" v-if="true" class="overflow-hidden pt4 mt3 absolute">
                <transition-group tag="div" name="item">
                    <story-card
                        v-for="story in displayList"
                        v-if="!!story"
                        :key="story.id"
                        :story="story"
                    ></story-card>
                </transition-group>
           </div>
        </transition>
    </div>
    `,
    props: {
        storyState: String
    },
    data() {
        return {
            apiData: [],
            itemsPerPage: 20,
            displayList: [],
            displayPage: Number(this.$route.params.page) || 1,
            transition: 'slide-left',
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
            console.log('page:', to, from)
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
            this.transition = to > from ? 'slide-left' : 'slide-right'
            this.displayPage = to
            let itemsPerPage = this.itemsPerPage
            this.displayList = this.apiData.slice((this.page-1)*itemsPerPage,  this.page*itemsPerPage)
        }
    }
})