const routes = [
    {
        path: '/',
        redirect: '/top'
    },
    {
        path: '/top',
        component: StoryListView,
        props: { storyState: 'top' }
    },
    { 
        path: '/new', 
        component: StoryListView,
        props: { storyState: 'new' }
    },
    { 
        path: '/show', 
        component: StoryListView,
        props: { storyState: 'show' }
    },
    { 
        path: '/ask',
        component: StoryListView,
        props: { storyState: 'ask' }
    },
    { 
        path: '/jobs', 
        component: StoryListView,
        props: { storyState: 'job' }
    },
    {
        path: '/user/:id',
        component: UserView,
    },
    {
        path: '/item/:id',
        component: ArticleView,
    }
]

const router = new VueRouter({
    routes
})