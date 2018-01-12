const webpack = require('webpack');//eslint-disable-line
const path = require('path');
const vendors = require('../package.json').dependencies;

const HtmlWebpackPlugin = require('html-webpack-plugin');//eslint-disable-line

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../client/index.js'),
        vendor: Object.keys(vendors), // 分离第三方库
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:8].js',
        publicPath: '/public/', // 输出目录对应的URL前缀
    },
    module: {
        rules: [
            { // 编译之前强制进行代码检查
                enforce: 'pre',
                test: /.jsx?/,
                loader: 'eslint-loader',
                include: path.resolve(__dirname, '../client'),
            },
            {
                test: /.jsx?$/,
                include: path.resolve(__dirname, '../client'),
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../client/index.tmpl.html'),
        }),
        // 防止重复
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity, // 保证没其它的模块会打包进vendor chunk
        }),
    ],
};
