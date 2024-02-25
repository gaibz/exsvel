/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @package exsvel
 * @path server/drivers/commands/action.js
 */

const {autoCreate} = require("../template_parser");
const moment = require("moment");

/**
 * if you only use `node command.js <thisfilename> <...args>` this function will be executed
 * for a custom action command, you can specify another method and export it
 * `node generator.js <thisfilename>:<method> <...args>`
 * @param {Array} args
 * @example node command.js action <...args>
 */
function run(args) {
    console.log('Running command');
    let name = args[0];
    if(!name) {
        return console.log("Please specify a Name for this action, node command.js action <name> <version:optional>");
    }
    let api_version = "v1";

    if(args[1])
    {
        api_version = args[1];
    }

    let file_name = name + 'Action.js';
    const package_json = require("../../../package.json");
    let author = process.env.AUTHOR_NAME;
    let date = moment().format("YYYY-MM-DD");
    let package_name = process.env.APP_NAME;


    autoCreate(__dirname + '/templates/action_blueprint.tjs', __dirname + '/../../actions/' + file_name, {
        file_name: file_name,
        name : name+"Action",
        route_name : name.toLowerCase(),
        author,
        date,
        package_name,
        api_version
    });

    console.log('Actions file created: ' + file_name);
}

module.exports = {
    run
}