const env = require('./enviroment');
const fs = require('fs');
const path = require('path');


// helper function are send to the locals of the app.

// this is the helper function
module.exports = (app) => {
    // defining the global function in the app
    app.locals.assertPath = function(filePath) {
        if(env.name == 'development') {
            return '/' + filePath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}