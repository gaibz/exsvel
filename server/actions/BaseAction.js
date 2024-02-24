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
}


module.exports = BaseAction;