"use server"

/**
 * Generates the html for the mail
 * @param firstname
 * @param feeds
 */
function html(firstname, feeds) {

    // Introduction
    let html = `
        <div class="logo">
            <img src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater." style="width: 200px;">
        </div>
    `;

    // Feeds
    for (let feed of feeds) {
        if(feed === undefined || feed.length === 0) continue;
        html += `
            <h1>${feed[0].websiteTitle}</h1>
            ${makeFeed(feed)}
        `;
    }

    // Style
    html += `
        <style>
            .logo { display: flex; justify-content: center; margin-bottom: 50px;}
            .hello {  display: flex; justify-content: center; margin-bottom: 20px;}
            body { background-color: transparent;}
            h2 { font-size: 24px; }
            h1 { display: flex; justify-content: center;}
            p, .subtitle { font-size: 16px; line-height: 1.5; color: #888; }
            a { text-decoration: none; color: #0077cc; }
            img { max-width: 100%; max-height: fit-content }
            .feed { padding: 1.5rem; margin-bottom: 20px; margin-inline: 5px; border-radius: 0.75rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
        </style>
    `;

    // Body wrapper
    html = `<body>${html}</body>`;

    return html;
}

/**
 * Generates the html for a feed
 * @param feed The feed
 * @returns {string} The feed in html
 */
function makeFeed(feed) {
    let feedHtml = [];
    for (let publication of feed) {
            feedHtml.push(`
            <div class="feed">
            <h2>${publication.title}</h2>
            <div class="subtitle">
                ${makeSubtitles(publication)}
            </div>
            <p>${publication.content}</p>
            </div>
        `);
    }
    return feedHtml.join('');
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
    if (publication.pubDate) subtitles.push(new Date(publication.pubDate).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }));
    if (publication.websiteLink) subtitles.push(`<a class="website" href="${publication.link}">${publication.websiteTitle}.</a>`);
    return subtitles.join(' - ');
}

module.exports = {
    html
}