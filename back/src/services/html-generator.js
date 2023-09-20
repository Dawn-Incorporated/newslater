/**
 * Generates the html for the mail
 * @param user User data
 * @param length The number of publications kept. If -1, don't limit.
 */
function html(user, length = -1) {
    const feeds = user.sources;
    const name = user.firstname;

    // Introduction
    let html = `
        <div class="logo">
            <img src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater." style="width: 200px;">
        </div>
        <p>hello ${name}. here's the latest.</p>
    `;

    // Feeds
    for (let feed of feeds) {
        html += `
            <h1>${feed[0].websiteTitle}</h1>
            ${makeFeed(feed, length)}
            <hr>
        `;
    }

    // Style
    html += `
        <style>
            body { background-color: transparent;}
            h2 { font-size: 24px; color: #666; }
            p, .subtitle { font-size: 16px; line-height: 1.5; color: #888; }
            a { text-decoration: none; color: #0077cc; }
            img { max-width: 100%; max-height: fit-content }
        </style>
    `;

    // Body wrapper
    html = `<body>${html}</body>`;

    return html;
}

/**
 * Generates the html for a feed
 * @param feed The feed
 * @param length For each feed, an array of publications
 * @returns {string} The feed in html
 */
function makeFeed(feed, length = -1) {
    let feedHtml = [];
    let numberOfPublications = 0;
    for (let publication of feed) {
        if (length === -1 || numberOfPublications++ < length) {
            feedHtml.push(`
            <h2>${publication.title}</h2>
            <div class="subtitle">
                ${makeSubtitles(publication)}
            </div>
            <p>${publication.content}</p>
        `);
        }
    }
    return feedHtml.join(' --- ');
}

/**
 * Generates the html for a publication subtitle
 * @param publication The publication
 * @returns {string} The subtitle in html
 */
function makeSubtitles(publication) {
    let subtitles = [];
    if (publication.creator) subtitles.push(publication.creator);
    if (publication.description) subtitles.push(publication.description);
    if (publication.pubDate) subtitles.push(new Date(publication.pubDate).toLocaleDateString());
    if (publication.websiteLink) subtitles.push(`<a class="website" href="${publication.websiteLink}">open ${publication.websiteTitle}.</a>`);
    return subtitles.join(' • ');
}

module.exports = {
    html
}