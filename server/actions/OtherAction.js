
const BaseAction = require('./BaseAction');
const User = require('../databases/models/User');

/** @type {import('express')} */
class OtherAction extends BaseAction {
    /**
    * Constructor
    * @param {Express} express
    */
    constructor(express) {
        super(express);

        this.express.get('/api/v1/other', this.index);
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async index(req, res) {
        await User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });

        let all_data = await User.findAll();
        res.send(all_data);
    }
}

module.exports = OtherAction;