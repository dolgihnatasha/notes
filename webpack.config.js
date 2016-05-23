const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        path: path.join(__dirname, '.'),
        filename: 'index.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};