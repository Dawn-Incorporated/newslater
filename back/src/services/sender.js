const Mailer = require('../config/mailer');

function process(publications) {
    Mailer.send("dawn.newslater@gmail.com", "Nouvelles publications", html(publications));
}

function html(publications) {
    let html = "<h1>Voici les dernières publications</h1>";
    publications.forEach(publication => {
        html += `<h2>${publication.title}</h2>`;
        html += `<p>${publication.description}</p>`;
        html += `<p>${publication.content}</p>`;
        html += `<p>${publication.link}</p>`;
    });
    return html;
}

module.exports = {
    process
}