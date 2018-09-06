const routes = [
    { path: '/', redirect: '/top' },
    { path: '/top/:page(\\d+)?', component: StoryListView, props: { storyState: 'top' } },
    { path: '/new/:page(\\d+)?', component: StoryListView, props: { storyState: 'new' } },
    { path: '/show/:page(\\d+)?', component: StoryListView, props: { storyState: 'show' } },
    { path: '/ask/:page(\\d+)?', component: StoryListView, props: { storyState: 'ask' } },
    { path: '/jobs/:page(\\d+)?', component: StoryListView, props: { storyState: 'job' } },
    { path: '/user/:id', component: UserView },
    { path: '/item/:id(\\d+)', component: ArticleView }
]

const router = new VueRouter({
    routes
})