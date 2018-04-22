const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        filename: 'bundle.[hash].js',
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
            path: './.env.prod'
        }),
        new HtmlWebpackPlugin({
            title: 'Student at BreatheCode Platform',
            favicon: 'favicon.png',
            template: 'template.html'
        })
    ]
})