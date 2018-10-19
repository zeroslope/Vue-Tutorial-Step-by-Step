function createListView(storyState) {
    return {
        name: `${storyState}-stories-view`,
        
        render(h) {
            return h(StoryListView, { props: { storyState } })
        }
    }
}

const routes = [
    { path: '/top/:page(\\d+)?', component: createListView('top'), },
    { path: '/new/:page(\\d+)?', component: createListView('new'), },
    { path: '/show/:page(\\d+)?', component: createListView('show'), },
    { path: '/ask/:page(\\d+)?', component: createListView('ask'), },
    { path: '/jobs/:page(\\d+)?', component: createListView('job'), },
    { path: '/user/:id', component: UserView },
    { path: '/item/:id(\\d+)', component: ArticleView },
    { path: '*', redirect: '/top' }
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})