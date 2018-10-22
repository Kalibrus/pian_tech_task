var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
    },
    output:{
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    } ,
                    'angular2-template-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.scss$/,
                use: [ 'to-string-loader', 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        stats: {
            warningsFilter: /System.import/
        },
        hot: true,
        port: 9000
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'src'),
            {}
        ),
        new UglifyJSPlugin()
    ]
};