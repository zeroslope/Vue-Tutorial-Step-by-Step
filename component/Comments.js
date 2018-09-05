Vue.component('comments-view', {
    template: `
    <li 
        class="b--black-30 bt pt2" 
        v-if="comment && !loading"
    >
        <div class="f6 gray">
            <a :href="'/user/' + comment.by" class="gray" @click.prevent="handleUserClick(comment.by)">{{ comment.by }}</a>
            {{ comment.time | timeFromNow }}
        </div>
        <div class="lh-solid f6 pv2 fw1" v-html="comment.text"></div>
        <div v-if="comment.kids && comment.kids.length" class="f6" :class="{ na2: open}">
            <a @click="open = !open">{{
                open
                    ? '[-]'
                    : '[+] ' + comment.kids.length + ' collapsed'
            }}</a>
        </div>
        <ul v-show="open" class="list pl3">
            <comments-view v-for="kid in comment.kids" :key="kid" :id="kid"></comments-view>
        </ul>
    </li>
    `,
    props: {
        id: Number,
    },
    inject: ['handleUserClick'],
    data() {
        return {
            open: true,
            loading: false,
            comment: {}
        }
    },
    beforeMount() {
        this.comment = {}
        this.loading = true
        getItem(this.id)
        .then(val => {
            this.comment = val
            this.loading = false
        })
    },
    methods: {
    }
})