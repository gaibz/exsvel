/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-24/02/24
 * @package exsvel
 * @path server/drivers/commands/migration.js
 */

const {autoCreate} = require('../template_parser');
const package_json = require("../../../package.json");
const moment = require("moment/moment");
const exec = require('child_process').exec;


function getCurrentDate() {
    let date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Ensure two digits

    return year + month + day + hours + minutes + seconds;
}

/**
 * Create new Migration File
 * @param {Array} args
 */
function create (args) {
    let name = args[0];
    if(!name) {
        return console.log("Please specify a Name for this migration, node command.js migration <name>");
    }


    let date_string = getCurrentDate();

    let file_name = date_string + '-' + name + '.js';

    const package_json = require("../../../package.json");
    let author = process.env.AUTHOR_NAME;
    let date2 = moment().format("YYYY-MM-DD");
    let package_name = process.env.APP_NAME;

    autoCreate(__dirname + '/templates/migration_blueprint.tjs', __dirname + '/../../databases/migrations/' + file_name, {
        migration_name: name,
        file_name: file_name,
        author,
        date:date2,
        package_name,
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
