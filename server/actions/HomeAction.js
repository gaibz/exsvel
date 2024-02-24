const BaseAction = require("./BaseAction");
/** @type {import('express')} */
class HomeAction extends BaseAction {
    /**
     * Constructor
     * @param {Express} express
     */
    constructor(express) {
        super(express);

        this.express.get('/api/v1/', (req, res) => {
            res.send('Hello World!')
        });

    }
}

module.exports = HomeAction;