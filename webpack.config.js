const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        puppeteer: 'require("puppeteer")', // Exclude puppeteer from bundling
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
};