const UserView = Vue.component('user-view', {
    template: `
    <div class="center mw7">
        <div class="bg-white pa4">
            <h2 class="f3 black-80 mt0">User : {{user.id}} </h2>
            <ul class="list pl0 f5">
                <li> <span class="dib w3">Created</span>: {{user.created | timeFromNow}} </li>
                <li> <span class="dib w3">Karma</span>: {{user.karma}} </li>
            </ul>
            <div class="f5" v-html="user.about"></div>
        </div>
    </div>
    `,
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.getUserData(this.$route.params.id)
    },
    watch: {
        '$route' (to, from) {
            this.getUserData(to.params.id)
        }
    },
    methods: {
        getUserData(userId) {
            this.user = {}
            return getUser(userId)
            .then(val => {
                this.user = val
            })
        }
    }
})