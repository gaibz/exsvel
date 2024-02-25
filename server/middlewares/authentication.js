/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-25
 * @package exsvel
 * @path server/middlewares/authentication.js
 */

const auth = require("../drivers/auth");

/**
 * Authorize
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {*}
 */
async function authorize(req, res, next) {
    let token = req.header('token');

    if (!token) return res.status(401).send('Access Denied');

    // check if token is valid
    try {
        let result = await auth.verifyAuthToken(token);
        if (result) {
            // add result to next request
            req.params.auth_data = result;
            next();
        }
        else {
            return res.status(400).send('Invalid Token');
        }
    }
    catch (e) {
        return res.status(400).send('Invalid Token ');
    }
}

module.exports = {
    authorize
}