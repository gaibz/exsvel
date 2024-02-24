/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-24/02/24
 * @package exsvel
 * @path server/drivers/commands/migration.js
 */

const {autoCreate} = require('../template_parser');
const exec = require('child_process').exec;


/**
 * Create new Migration File
 * @param {Array} args
 */
function create (args) {
    let name = args[0];
    let date = new Date();
    let date_string = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '' + date.getHours() + date.getMinutes() + date.getSeconds();

    let file_name = date_string + '-' + name + '.js';

    autoCreate(__dirname + '/templates/migration_blueprint.js', __dirname + '/../../databases/migrations/' + file_name, {
        migration_name: name,
        file_name: file_name
    });
    console.log('Migration file created: ' + file_name);
}


/**
 * Migrate
 * @param {Array} args
 */
function migrate(args) {
    console.log('Running Migration');
    exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}


/**
 * Rollback Migration
 * @param {Array} args
 */
function rollback(args) {
    console.log('Rollback Migration');
    exec('npx sequelize-cli db:migrate:undo', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });

}

/**
 * Run Migration
 * @param {Array} args
 */
function run(args) {
    migrate(args);
}

module.exports = {
    create,
    migrate,
    rollback,
    run
}