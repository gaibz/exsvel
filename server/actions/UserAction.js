/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-02-25
 * @package exsvel
 * @path server/actions/UserAction.js
 */

const BaseAction = require("./BaseAction");
const {authorize} = require("../middlewares/authentication");


class UserAction extends BaseAction {

    /**
     * Constructor
     * @param {Express} express
     */
    constructor(express) {
        super(express);

        this.express.get(`/api/v1/users`, authorize, this.index);
        this.express.get(`/api/v1/user/:id`, authorize, this.show);
        this.express.post(`/api/v1/user`, authorize, this.create);
        this.express.put(`/api/v1/user/:id`, authorize, this.update);
        this.express.delete(`/api/v1/user/:id`, authorize, this.remove);

    }

    /**
     * Default For HTTP GET (Indexing)
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async index(req, res) {
        res.send(req.params.auth_data);
    }

    /**
     * Show individual Item (HTTP GET)
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async show(req, res) {
        const id = parseInt(req.params.id);
    }

    /**
     * Create Action (For HTTP POST)
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async create(req, res) {

    }

    /**
     * Update Request (HTTP PUT)
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async update(req, res) {
        const id = parseInt(req.params.id);
    }


    /**
     * Delete Request (HTTP DELETE)
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async remove(req, res) {
        const id = parseInt(req.params.id);
    }

    // You can define another method in here and access with routing
    // ...
}

module.exports = UserAction