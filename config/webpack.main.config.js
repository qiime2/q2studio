const path = require('path');

const extendConfig = require('./webpack.shared');


module.exports = extendConfig(() => {
    return {
        entry: [
            path.resolve(__dirname, '../app/main.js')
        ],
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'main.js'
        },
        target: 'electron-main',
        node: {
            // Needed to support ${__dirname}
            __dirname: false,
            __filename: false
        }
    };
}, false);
