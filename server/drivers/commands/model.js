/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @package exsvel
 * @path server/drivers/commands/model.js.js
 */

const {autoCreate} = require("../template_parser");

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

    autoCreate(__dirname + '/templates/model_blueprint.js', __dirname + '/../../databases/models/' + file_name, {
        file_name: file_name,
        modelName : name,
        tableName : tableNameFromModelName(name)
    });

    console.log('Model file created: ' + file_name);
}

module.exports = {
    run,
    create
}