'use strict';

module.exports = {
    entry  : './index.js',
    output : {
        path: __dirname,
        filename : './build.js'
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
    }
};
