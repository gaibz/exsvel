/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-24/02/24
 * @package exsvel
 * @path /command.js
 */

require("dotenv").config();

let args = process.argv.slice(2);


if(args.length === 0) {
    console.log('Usage: node command.js <command> <args>');
    // get all available generators
    console.log('Available Commands are : ');
    let fs = require('fs');
    let path = require('path');
    // list all files contains .js in server/drivers/commands directory and get filename without .js extension
    // then get all exported function from each file
    console.log("SYSTEM PRE-DEFINED COMMANDS : ");
    fs.readdirSync(path.join(__dirname, 'server/drivers/commands')).forEach(file => {
        if(file.endsWith('.js')) {
            let generator = require('./server/drivers/commands/' + file);
            let name = file.replace('.js', '');
            console.log("  " + name +" <...args>", " (default: run)", " File : ./server/drivers/commands/" + file );
            Object.keys(generator).forEach(method => {
                console.log('    ' + name + ':' + method + ' <...args>', (method === "run" ? " (default)" : ""));
                // TODO : get jsdoc @example and print it
            });

            // print lines
            console.log('----------------');
        }
    });

    console.log("USER DEFINED COMMANDS : ");
    // list all files contains .js in server/commands directory and get filename without .js extension
    // then get all exported function from each file
    fs.readdirSync(path.join(__dirname, 'server/commands')).forEach(file => {
        if(file.endsWith('.js')) {
            let generator = require('./server/commands/' + file);
            let name = file.replace('.js', '');
            console.log("  " + name +" <...args>", " (default: run)", " File : ./server/commands/" + file );
            Object.keys(generator).forEach(method => {
                console.log('    ' + name + ':' + method + ' <...args>', (method === "run" ? " (default)" : ""));
                // TODO : get jsdoc @example and print it
            });

            // print lines
            console.log('----------------');
        }
    });

    process.exit(1);
}

let command = args[0];

// split :
command = command.split(':');
let group = command[0];
let action = command[1] || 'run';

let acommand = require('./server/drivers/commands/' + group + '.js');

console.log('Running generator: ' + group + ':' + action+ " with args: "+args.slice(1).join(", "));

acommand[action](args.slice(1));
