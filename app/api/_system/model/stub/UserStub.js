"use server"

const sanMarino = {
    login: "vanhove",
    password: "jesuisundindo",
    lastname: "Vanhove",
    firstname: "Valentin",
    mail: "dawn.newslater@gmail.com",
    feeds: [
        'https://9to5mac.com/feed',
        'https://apple.com/newsroom/rss-feed.rss'
    ],
    sendtime: "06:00:00",
    postlimit: 10
}

const padilla = {
    login: "byar",
    password: "nice",
    lastname: "Byar",
    firstname: "Matis",
    mail: "dawn.newslater@gmail.com",
    feeds: [
        'https://9to5mac.com/feed',
        'https://apple.com/newsroom/rss-feed.rss'
    ],
    sendtime: "06:00:00",
    postlimit: 10
}

function getUsers() {
    return [padilla];
}

module.exports = {
    getUsers
}