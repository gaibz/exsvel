/**
 * @author Herlangga Sefani
 * This is main file of the application server
 * You just need to run this file to start the server
 */
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Load all actions from server/actions folder
fs.readdirSync('./server/actions').forEach(file => {
    if (file.endsWith('.js')) {
        const action = require(`./server/actions/${file}`);
        new action(app);
    }
})


// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});