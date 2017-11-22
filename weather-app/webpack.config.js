'use strict';

const path = require('path');

module.exports = {
    entry  : path.resolve(__dirname, './src/index.js'),
    output : {
        filename : './dist/build.js'
    },
    module : {
        loaders: [ {
            test   : /.js$/,
            loader : 'babel-loader',
            query: {
                presets: ['es2015', 'es2015', 'stage-0']
            }
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000
    },
    watch: true
};
