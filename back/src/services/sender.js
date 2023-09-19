const Mailer = require('../config/mailer');

function process(publications) {
    Mailer.send("dawn.newslater@gmail.com", "Nouvelles publications", html(publications));
}

function html(publications) {
    return `
        <h1 style='color: #333;'>Voici les dernières publications</h1>
        <style>
            h2 { font-size: 24px; color: #666; }
            p { font-size: 16px; line-height: 1.5; color: #888; }
            a { text-decoration: none; color: #0077cc; }
        </style>
        ${publications.map(publication => `
            <h2>${publication.title}</h2>
            <p>${publication.description}</p>
            <p>${publication.content}</p>
            <p>${publication.link}</p>
        `).join('')}
    `;
}

module.exports = {
    process
}