const merge = require('webpack-merge');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: "source-map",
    output: {
        filename: '[hash].bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    plugins: [
        // new UglifyJSPlugin({
        //     cache: false,
        //     sourceMap: true,
        //     exclude: /\/stores/,
        //     uglifyOptions: {
        //         mangle: {
        //             keep_classnames: true
        //         }
        //     }
        // }),
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
})
