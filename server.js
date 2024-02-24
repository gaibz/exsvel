/**
 * @author Herlangga Sefani
 * This is main file of the application server
 * You just need to run this file to start the server
 */
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

// Load all actions from server/actions folder and add as /api/... endpoint
fs.readdirSync('./server/actions').forEach(file => {
    if (file.endsWith('.js')) {
        const action = require(`./server/actions/${file}`);
        new action(app);
    }
});

// define static public folder
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`)
});