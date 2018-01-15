const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../client/ssr.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'ssr.js',
        libraryTarget: 'commonjs2', // exported with module.exports
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /.jsx?/,
            //     loader: 'eslint-loader',
            //     include: path.resolve(__dirname, '../client'),
            // },
            {
                test: /.jsx?$/,
                include: path.resolve(__dirname, '../client'),
                loader: 'babel-loader',
            },
        ],
    },
    target: 'node', // 包运行的环境
};
