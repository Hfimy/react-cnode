const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',
    entry: {
        app: path.resolve(__dirname, '../client/ssr.js'),
    },
    output: {
        path: path.resolve(__dirname, '../server-render-dist'),
        filename: 'ssr.js',
        // publicPath: '/public',
        libraryTarget: 'commonjs2',//模块加载方案
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: path.resolve(__dirname, '../client'),
                loader: 'babel-loader'
            }
        ]
    }
};
