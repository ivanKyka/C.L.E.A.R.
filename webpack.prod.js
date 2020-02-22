const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');
const merge = require('webpack-merge');
const webpack = require("webpack");


module.exports = merge(common,{
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            STRAPI_URL: JSON.stringify("http://localhost:1337"),
            VOICE_REC_URL: JSON.stringify("ws://localhost:3333")
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true,
            cache: true,
            extractComments: true,
            terserOptions: {
                ecma: 5,
                ie8: false,
                safari10: true,
                compress: true,
                warnings: true,
            },
        })],
    }
});