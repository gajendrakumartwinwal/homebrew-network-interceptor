const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    target: 'node',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        usedExports: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/resources/response.json',
                    to: 'public', // Output directory within the build
                }
            ],
        }),
        new CleanWebpackPlugin(),
    ],
};