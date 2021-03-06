var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PACKAGE = require('./package.json');
// 项目根路径
var ROOT_PATH = path.resolve(__dirname);
// 产出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var plugins = [
    new webpack.ProvidePlugin({"joint": "jointjs"}),
    new HtmlWebpackPlugin({
        title: 'Nanometer',//生成的html文档的标题
        favicon: './favicon.ico', //favicon路径
        filename: './index.html',//输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置
        template: './index.html',
        inject: true,
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }),
    new webpack.BannerPlugin({
        banner: `${PACKAGE.description}\r\n@version v${PACKAGE.version}\r\n@author @copyright 2017 ${PACKAGE.author} \r\n@link https://www.yeeoffice.com/\r\n@date ${new Date()}`,
        raw: false,
        entryOnly: false
    })];

plugins.push(new webpack.DefinePlugin({
    'process.env': {
        "CDN": JSON.stringify("http://www.famliytree.cn/")
    }
}));

module.exports = {
    devtool: "none",
    entry: {
        app: ['./src/app']//入口文件
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.tsx|\.ts$/,
            exclude: /^node_modules$/,
            use: 'awesome-typescript-loader'
        }, {
            test: /\.less|\.css$/,
            exclude: /^node_modules$/,
            use: ["style-loader", "css-loader", "less-loader"]
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: 'url-loader?limit=50000&name=[path][name].[ext]'
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {}
    },
    externals: {}
}