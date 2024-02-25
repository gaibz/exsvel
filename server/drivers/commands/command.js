/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-24
 * @package exsvel
 * @path server/drivers/commands/command.js
 */

const {autoCreate} = require('../template_parser');
const package_json = require("../../../package.json");
const moment = require("moment/moment");

/**
 * Create new Generator File
 * @param {Array} args
 * @example node command.js command:create <name>
 */
function create(args) {
    if(!args[0]) {
        console.log('Please specify Command name');
        return;
    }

    let file_name = args[0] + '.js';

    const package_json = require("../../../package.json");
    let author = process.env.AUTHOR_NAME;
    let date = moment().format("YYYY-MM-DD");
    let package_name = process.env.APP_NAME;

    console.log('Create a Command : ', file_name);
    autoCreate(__dirname + '/templates/command_blueprint.tjs', __dirname + '/../../commands/' + file_name, {
        file_name: file_name,
        name: args[0],
        author,
        date,
        package_name,
    });
}

/**
 * Create new Command File
 * @param {Array} args
 * @example node command.js command <name>
 */
function run(args) {
    create(args)
}

module.exports = {
    run
}