/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-24
 * @package exsvel
 * @path server/drivers/commands/command.js
 */

const {autoCreate} = require('../template_parser');

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
    console.log('Create a Command : ', file_name);
    autoCreate(__dirname + '/templates/command_blueprint.js', __dirname + '/../../commands/' + file_name, {
        file_name: file_name,
        name: args[0]
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