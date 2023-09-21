const Cron = require('node-cron');
const {log} = require('./logger');

/**
 * @module ErrorHandler
 * The error handler is a pool of failed requests that will be retried later.
 *
 * It can be used to retry failed requests or requests that failed because of a lack of connection.
 *
 * It is a pool of objects that contains the following properties:
 * - methodToRun: the function to call
 * - args: the arguments to pass to the function
 * - attempts: the number of attempts that are left
 *
 * It uses a cron job to retry the requests.
 */

/**
 * Pool of failed requests.
 * @type {*[]}
 */
const pool = [];

Cron.schedule('*/5 * * * *', async () => {
    await processPool();
});

/**
 * Adds a request to the pool or updates an existing request.
 *
 * This function generates a unique key for the method to run.
 * Then it checks if a request with the same methodKey and arguments exists in the pool.
 * If it exists, it updates the attempts for the existing request.
 * If it doesn't exist, it adds a new request to the pool.
 * If there are no attempts left, it removes the request from the pool.
 *
 * @param methodToRun the function to call
 * @param args the arguments to pass to the function
 * @param attempts the number of attempts that are left
 */
function addToPool(methodToRun, args, attempts) {
    const methodKey = generateMethodKey(methodToRun);

    const existingRequestIndex = pool.findIndex(request => {
        // Check if a request with the same methodKey and arguments exists in the pool
        return request.methodKey === methodKey && JSON.stringify(request.args) === JSON.stringify(args);
    });

    if (existingRequestIndex !== -1) {
        // Update the attempts for the existing request
        pool[existingRequestIndex].attempts--;

        // Remove the request from the pool if there are no attempts left
        if (pool[existingRequestIndex].attempts <= 0) {
            removeFromPool(methodKey, args);
            log("ERROR", "Error Handler Service: Failed to execute request. Removed from pool.");
            return;
        }

        log("WARNING", "Error Handler Service: Updated request in pool. " + pool[existingRequestIndex].attempts + " attempts left.");
    } else {
        // Add a new request to the pool
        pool.push({methodKey, methodToRun, args, attempts});
        log("WARNING", "Error Handler Service: Added request to pool. " + attempts + " attempts left.");
    }
}

/**
 * Generates a unique key for a method.
 * @param methodToRun the function to call
 * @returns {string} a unique key for the method
 */
function generateMethodKey(methodToRun) {
    return methodToRun.name; // Use the function name as the key
}

/**
 * Process the pool of failed requests recursively.
 */
async function processPool() {
    if (pool.length === 0) {
        log("INFO", "Error Handler Service: No errors awaiting resolution.")
        return;
    }

    for (let i = 0; i < pool.length; i++) {
        await pool[i].methodToRun(...pool[i].args);
    }
}

/**
 * Removes a request from the pool.
 * @param methodKey the unique identifier for the function
 * @param args the arguments to pass to the function
 */
function removeFromPool(methodKey, args) {
    pool.splice(pool.findIndex((elem) => {
        return elem.methodKey === methodKey && JSON.stringify(elem.args) === JSON.stringify(args);
    }), 1);
}

module.exports = {
    addToPool
};
