function log(type, message) {
    // Get current time
    const timestamp = new Date().toISOString();

    // Add color to type
    switch (type) {
        case 'INFO':
            type = `\x1b[32m${type}\x1b[0m`;
            break;
        case 'ERROR':
            type = `\x1b[31m${type}\x1b[0m`;
            break;
        case 'WARNING':
            type = `\x1b[33m${type}\x1b[0m`;
            break;
        default:
            type = `\x1b[37m${type}\x1b[0m`;
    }

    // Print log
    console.log(`[${timestamp}] ${type} ${message}`);
}

module.exports = {
    log
}