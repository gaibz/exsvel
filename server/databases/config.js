const fs = require('fs');
require('dotenv').config();

console.log(process.env);

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DRIVER,
        dialectOptions: {
            bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            // }
        }
    },
    // test: {
    //     username: process.env.CI_DB_USERNAME,
    //     password: process.env.CI_DB_PASSWORD,
    //     database: process.env.CI_DB_NAME,
    //     host: '127.0.0.1',
    //     port: 3306,
    //     dialect: 'mysql',
    //     dialectOptions: {
    //         bigNumberStrings: true
    //     }
    // },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DRIVER,
        dialectOptions: {
            bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            // }
        }
    }
};