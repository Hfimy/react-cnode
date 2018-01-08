const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../client/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:8].js',
        publicPath: '/public',//输出解析文件的目录，url相对于HTML页面
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: path.resolve(__dirname, '../client'),
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['../dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../client/template.html'),
            favicon: path.resolve(__dirname, '../client/favicon.ico'),
        })
    ]
};
