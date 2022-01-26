const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        mvvm: path.resolve(__dirname, 'mvvm/index.js'),
        // js: path.resolve(__dirname, 'js/index.js'),
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