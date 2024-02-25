/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-02-25
 * @package exsvel
 * @path server/commands/jwt_secret.js
 */

/**
 * if you only use `node command.js <thisfilename> <...args>` this function will be executed
 * for a custom action command, you can specify another method and export it
 * `node generator.js <thisfilename>:<method> <...args>`
 * @param {Array} args
 * @example node command.js jwt_secret <...args>
 */
function run(args) {
    console.log('Generating JWT Secret');

    let jwt_secret = require('crypto').randomBytes(64).toString('hex');

    console.log('JWT Secret generated');
    console.log(jwt_secret);

}

module.exports = {
    run
}