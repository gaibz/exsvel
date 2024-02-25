/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @package exsvel
 * @path server/drivers/commands/model.js.js
 */

const {autoCreate} = require("../template_parser");
const package_json = require("../../../package.json");
const moment = require("moment");

/**
 * if you only use `node command.js <thisfilename> <...args>` this function will be executed
 * for a custom action command, you can specify another method and export it
 * `node generator.js <thisfilename>:<method> <...args>`
 * @param {Array} args
 * @example node generator.js model <...args>
 */
function run(args) {
    console.log('Running generator');
}


function tableNameFromModelName(modelName) {
    if(modelName.endsWith('y')) {
        return modelName.slice(0, -1) + 'ies';
    }

    return modelName.toLowerCase() + 's';
}

/**
 * Create a new Model
 * @param {Array} args
 */
function create(args) {
    let name = args[0];
    let file_name = name + '.js';


    if(!name) {
        return console.log("Please specify a Name for this model, node command.js model <name>");
    }

    const package_json = require("../../../package.json");
    let author = process.env.AUTHOR_NAME;
    let date = moment().format("YYYY-MM-DD");
    let package_name = process.env.APP_NAME;

    autoCreate(__dirname + '/templates/model_blueprint.tjs', __dirname + '/../../databases/models/' + file_name, {
        file_name: file_name,
        modelName : name,
        tableName : tableNameFromModelName(name),
        author,
        date,
        package_name,
    });

    console.log('Model file created: ' + file_name);
}

module.exports = {
    run,
    create
}