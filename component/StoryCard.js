Vue.component('story-card', {
    template: `
    <article 
        class="bg-white b--black-30 bb" 
    >
        <div class="dt h6 w-100 pb2">
            <div class="dtc w3 tc v-mid">
                <span class="orange f3">{{story.score}}</span>
            </div>
            <div class="dtc v-mid pl2">
                <div class="lh-title black mv0">
                    <template v-if="story.url">
                        <a :href="story.url" class="link f6 f5-ns fw4 black">{{story.title}}</a>
                        <span class="f7 black-60">({{story.url | host}})</span>
                    </template>
                    <template v-else>
                        <a :href="'/item/' + story.id" class="link f6 f5-ns fw4 black">{{story.title}}</a>
                    </template>
                </div>
                <div class="f7 fw5 mt2 mb0 black-60">
                    by <a :href="'/user/' + story.by" class="color-inherit" @click.prevent="handleUserClick(story.by)">{{story.by}}</a> 
                    <span>{{story.time | timeFromNow}}</span> 
                    <span v-if="story.descendants"> | </span> 
                    <a :href="'/item/' + story.id" class="color-inherit" v-if="story.descendants" @click.prevent="handleCommentClick(story)">{{story.descendants}} comments</a>
                </div>
            </div>
        </div>
    </article>
    `,
    props: {
        story: Object,
    },
    data() {
        return {
            
        }
    },
    methods: {
        handleCommentClick(story) {
            this.$emit('comment-click', story)
        },
        handleUserClick(by) {
            this.$emit('user-click', by)
        }
    }
})