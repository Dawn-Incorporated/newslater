const Mailer = require('../config/mailer');

function process(publications) {
    Mailer.send("matis.byar.06@icloud.com", "Nouvelles publications", html(publications));
}

function html(publications) {
    return `
        <h1 style='color: #333;'>Voici les dernières publications</h1>
        <style>
            h2 { font-size: 24px; color: #666; }
            p, .subtitle { font-size: 16px; line-height: 1.5; color: #888; }
            a { text-decoration: none; color: #0077cc; }
            img { max-width: 100%; }
        </style>
        ${publications.map(publication => `
            <h2>${publication.title}</h2>
            <div class="subtitle">
                ${makeSubtitles(publication)}
            </div>
            <p>${publication.content}</p>
        `).join('')}
    `;
}

function makeSubtitles(publication) {
    let subtitles = [];
    if (publication.creator) subtitles.push(publication.creator);
    if (publication.description) subtitles.push(publication.description);
    if (publication.pubDate) subtitles.push(new Date(publication.pubDate).toLocaleDateString());
    if (publication.link) subtitles.push(`<a href="${publication.link}">read full story.</a>`);
    return subtitles.join(' • ');
}

module.exports = {
    process
}