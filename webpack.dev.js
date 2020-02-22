const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require("webpack");

    module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        inline: true,
        contentBase: './',
        historyApiFallback: true,
        watchOptions: {
            ignored: /\/node_modules\/.*/
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            STRAPI_URL: JSON.stringify("http://192.168.43.122:1337"),
            VOICE_REC_URL: JSON.stringify("ws://192.168.43.122:3333")
        })
    ]
});