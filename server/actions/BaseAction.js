/** @type {import('express')} */
/**
 * BaseAction class
 */
class BaseAction {
    /**
     * @param {Express} express_app
     */
    constructor(express_app) {
        this.express = express_app;
    }

    getFullUrl(req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    }
}


module.exports = BaseAction;