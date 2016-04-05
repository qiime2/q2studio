const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const extendConfig = require('./webpack.shared');

module.exports = extendConfig((config) => {
    return {
        plugins: [...config.plugins,
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new HtmlWebpackPlugin({
                template: 'app/index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                },
                inject: true
            }),
            new ExtractTextPlugin('css/main.css')
        ]
    };
}, false);
