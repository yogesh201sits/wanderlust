class ExpressError extends Error {
    constructor(status, message) {
        super(message); // pass message to the base Error class
        this.status = status;
    }
}

module.exports = ExpressError;
