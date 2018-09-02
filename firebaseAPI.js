let config = {
    databaseURL: "https://hacker-news.firebaseio.com",
}
firebase.initializeApp(config)
let database = firebase.database()
let rootRef = database.ref('v0')

function getItem(itemId) {
    return rootRef.child('item/' + itemId)
    .once('value')
    .then(snapshot => {
        const val = snapshot.val()
        return val
    })
}

function getUser(userId) {
    return rootRef.child('user/' + userId)
    .once('value')
    .then(snapshot => {
        const val = snapshot.val()
        return val
    })
}

function getMaxItemId() {
    return rootRef.child('maxitem')
    .once('value')
    .then(snapshot => {
        const val = snapshot.val()
        return val
    })
}

function getStories(type) {
    if (['top', 'new', 'best', 'ask', 'show', 'job'].indexOf(type) === -1) return
    return rootRef.child(`${type}stories`)
    .once('value')
    .then(snapshot => {
        const val = snapshot.val()
        return val
    })
}

function getUpdates() {
    return rootRef.child(`updates`)
    .once('value')
    .then(snapshot => {
        const val = snapshot.val()
        return val
    })
}