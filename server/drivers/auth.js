/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-25
 * @package exsvel
 * @path server/drivers/auth.js
 */

const jwt = require("jsonwebtoken");

/**
 * Generate token based on payload
 * @param {Object} payload
 * @param {String} algorithm
 * @returns {Promise<String>}
 */
function generateToken(payload, algorithm = "HS256") {
    return new Promise((resolve, reject) => {
        let secret = process.env.APP_JWT_SECRET;
        jwt.sign(payload, secret, {
            algorithm
        }, (err, token) => {
            if(err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

/**
 * Verify token
 * @param {String} token
 * @returns {Promise<Object>}
 */
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        let secret = process.env.APP_JWT_SECRET;
        jwt.verify(token, secret, {
            algorithms: ["HS256"]
        }, (err, decoded) => {
            if(err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}


/**
 * Generate Auth Token
 * @param {Object} data
 * @returns {Promise<String>}
 */
function generateAuthToken(data) {
    return new Promise((resolve, reject) => {
        generateToken({
            issuer : process.env.APP_NAME,
            data,
        }).then(token => {
            resolve(token);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Verify Auth Token
 * @param token
 * @returns {Promise<Object>}
 */
function verifyAuthToken(token) {
    return new Promise((resolve, reject) => {
        verifyToken(token).then(decoded => {
            if(decoded.data) {
                return resolve(decoded.data);
            }
            reject("Invalid Token Data");
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    generateToken,
    verifyToken,
    generateAuthToken,
    verifyAuthToken
}