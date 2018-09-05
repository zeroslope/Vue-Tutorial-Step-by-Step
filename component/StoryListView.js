Vue.component('story-list-view', {
    template: `
    <div class="overflow-hidden">
        <story-card
            v-for="story in storyList"
            v-if="!!story"
            :key="story.id"
            :story="story"
            @comment-click="handleCommentClick"
            @user-click="handleUserClick"
        ></story-card>
    </div>
    `,
    props: {
        storyList: Array
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