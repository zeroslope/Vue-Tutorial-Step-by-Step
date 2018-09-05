Vue.component('article-view', {
    template: `
    <div class="bg-white overflow-hidden">
        <story-card
            :story="story"
            @comment-click="handleCommentClick"
            @user-click="handleUserClick"
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
    `,
    props: {
        story: Object
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