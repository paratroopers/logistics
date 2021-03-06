var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');


// 从配置文件获取env or  直接从环境获取
var port = 8080;

module.exports = {
    devtool: 'source-map',
    entry: {
        app: ['./src/app']
    },
    output: {
        path: '/',
        publicPath: 'http://127.0.0.1:' + port + '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.tsx|\.ts$/,
            exclude: /^node_modules$/,
            use: 'awesome-typescript-loader'
        },  {
            test: /\.less|\.css$/,
            exclude: /^node_modules$/,
            use: ["style-loader", "css-loader", "less-loader"]
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: 'url-loader?limit=50000&name=[path][name].[ext]'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Nanometer',//生成的html文档的标题
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
        new OpenBrowserWebpackPlugin({
            url: 'http://127.0.0.1:' + port + '/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'react-router': 'react-router/umd/ReactRouter.min.js'
        },
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    externals: {}
}