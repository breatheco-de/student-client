const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                ecma: 8,
                warnings: false,
                output: {
                    comments: false,
                    beautify: false,
                }
            }
        }),
        new Dotenv({
            path: './.prod.env'
        })
    ]
})