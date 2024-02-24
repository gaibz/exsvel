/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @package exsvel
 * @path server/drivers/generators/samplecommand.js
 */

/**
 * if you only use `node command.js <thisfilename> <...args>` this function will be executed
 * for a custom action command, you can specify another method and export it
 * `node generator.js <thisfilename>:<method> <...args>`
 * @param {Array} args
 * @example node generator.js samplecommand <...args>
 */
function run(args) {
    console.log('Running command');
}

module.exports = {
    run
}