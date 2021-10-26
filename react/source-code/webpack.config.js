const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            templateContent: `
    <html>
      <body>
        <div id="root">Hello World</div>
      </body>
    </html>
  `
        })
    ],
    devServer: {
        port: '8000'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}