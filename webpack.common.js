const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        reactSourceCode: path.resolve(__dirname, 'react/source-code/index.js'),
        js: path.resolve(__dirname, 'js/index.js'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '数据绑定',
            template: path.resolve(__dirname, 'index.html'),
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}