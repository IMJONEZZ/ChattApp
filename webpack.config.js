const path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJSPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development'

var plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body'
    })
];

console.log('> NODE_ENV:', env);

if ( env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJSPlugin({
            sourceMap: false
        })
    );
}


module.exports = {
    entry: (env !== 'production' ? [
        'react-hot-loader/patch',
        // 'font-awesome-webpack!./font-awesome.config.js',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        // './src/index.js'
    ] : []).concat(['./client/index.js']),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js[x]{0,1}$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react", "stage-2"],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: plugins
};

