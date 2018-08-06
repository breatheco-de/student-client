const merge = require('webpack-merge');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: "source-map",
    // output: {
    //     filename: 'bundle.[hash].js',
    // },
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
        })
    ]
})