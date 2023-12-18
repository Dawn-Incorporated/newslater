require('dotenv').config({path: './.env'});
const test = require('node:test');
const userController = require("../src/controller/UserController");
const userStub = require("../src/model/stub/UserStub");
const rssRetriever = require("../src/services/rss-retriever");
const rssFilter = require("../src/services/rss-filter");
const generateHTML = require("../src/services/html-generator");
const {send} = require("../src/config/mailer");
const {logger, errorHandler} = require("byarutils");


test('send mail with database', {skip: false}, async (t) => {
    try {
        // Récupération des utilisateurs
        const users = await userController.getUsers();

        users.map(async (user) => {
            // Récupération des feeds de l'utilisateur depuis ses sources
            let userFeeds = await rssRetriever.retrieveFeeds(user.sources);

            // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
            let userFeedsFiltered = await rssFilter.filter(userFeeds, user.postlimit);

            // Génération du mail pour l'utilisateur
            let mailBody = generateHTML.html(user.firstname, userFeedsFiltered)

            // Envoi du mail à l'utilisateur
            await send(user.mail, "Start your day with newslater.", mailBody);
        });

    } catch (error) {
        logger.log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        //errorHandler.addToPool(t, [], 5);
    }
});


test('send mail with stub', {skip: true}, async (t) => {
    try {
        // Récupération des utilisateurs
        const users = userStub.getUsers();

        users.map(async (user) => {
            // Récupération des feeds de l'utilisateur depuis ses sources
            let userFeeds = await rssRetriever.retrieveFeeds(user.sources);

            // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
            let userFeedsFiltered = await rssFilter.filter(userFeeds, user.postlimit);

            // Génération du mail pour l'utilisateur
            let mailBody = generateHTML.html(user.firstname, userFeedsFiltered)

            // Envoi du mail à l'utilisateur
            await send(user.mail, "Start your day with newslater.", mailBody);
        });

    } catch (error) {
        logger.log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        //errorHandler.addToPool(t, [], 5);
    }
});