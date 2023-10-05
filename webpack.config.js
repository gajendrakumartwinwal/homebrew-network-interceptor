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
    plugins: [
        new CleanWebpackPlugin(),
    ],
};