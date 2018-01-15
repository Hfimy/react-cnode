const merge = require('webpack-merge');//eslint-disable-line
const common = require('./webpack.common');
const webpack = require('webpack');//eslint-disable-line

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
});
