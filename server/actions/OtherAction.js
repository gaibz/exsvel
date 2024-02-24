
const BaseAction = require('./BaseAction');
const User = require('../databases/models/user');

/** @type {import('express')} */
class OtherAction extends BaseAction {
    /**
    * Constructor
    * @param {Express} express
    */
    constructor(express) {
        super(express);

        this.express.get('/other', this.otherAction);
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async otherAction(req, res) {
        await User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });

        let all_data = await User.findAll();
        res.send(all_data);
    }
}

module.exports = OtherAction;