const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: [
            "antd",
            "lodash",
            "moment",
            "superagent",
            "rangy",
            "spark-md5",
            "redux-saga",
            "redux",
            "redux-actions",
            'react',
            'react-dom',
            "react-color",
            "react-intl",
            "react-lazyload",
            "react-redux",
            "react-router",
            "classnames",
            "dom-scroll-into-view",
            "moment-timezone",
            "mockjs",
            "jquery",
            "rc-input-number"
        ]
    },
    output: {
        path: path.join(__dirname, '../src'),
        filename: '[name].dll.js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]_library'
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.DllPlugin({
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: path.join(__dirname, '../src', '[name]-manifest.json'),
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
            name: '[name]_library'
        })
        // , new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }), new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ch/)
    ],
    module: {
        rules: [{
            test: /\.tsx|\.ts$/,
            exclude: /^node_modules$/,
            use: 'awesome-typescript-loader'

        }, {
            test: /\.(less|css)$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader",
                    "less-loader"
                ]
            })
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: 'url?limit=10000&name=img/[hash].[ext]'
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};
