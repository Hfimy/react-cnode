const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const isDev = process.env.NODE_ENV === 'development';

module.exports = merge(common, {
    entry: [
        'react-hot-loader/patch',
        path.resolve(__dirname, '../client/index.js')
    ],
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 521,
        contentBase: path.resolve(__dirname, '../server-render-dist'),
        historyApiFallback: {
            index: '/public/index.html'
        },
        hot: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        publicPath: '/public',
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: isDev
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
});
