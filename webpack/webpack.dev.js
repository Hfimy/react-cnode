const webpack = require('webpack');//eslint-disable-line
const path = require('path');
const merge = require('webpack-merge');//eslint-disable-line
const common = require('./webpack.common');

module.exports = merge(common, {
    entry: [
        'react-hot-loader/patch',
        path.resolve(__dirname, '../client/index.js'),
    ],
    devServer: {
        host: '0.0.0.0',
        port: 521,
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: {
            index: '/public/index.html',
        },
        hot: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        publicPath: '/public/',
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true, // 编译期间定义变量
        }),
    ],
});
