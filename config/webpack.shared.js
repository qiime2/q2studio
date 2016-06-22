const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function extendConfig(override, isDev) {
    var cssLoader = 'css-loader?modules&importLoaders=1' + // eslint-disable-line no-var
                    '&localIdentName=[local]!postcss-loader';
    const autoprefixer = require('autoprefixer');
    if (!isDev) {
        cssLoader = ExtractTextPlugin.extract('style-loader', cssLoader);
    } else {
        cssLoader = `style-loader!${cssLoader}`;
    }

    const defaultConfig = {
        entry: [
            path.resolve(__dirname, '../app/js/main.jsx')
        ],
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'js/bundle.js'
        },
        plugins: [],
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.png$/,
                    // inline files < 5kb
                    loader: 'url-loader?limit=5000&name=img/[name]-[hash].[ext]'
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: path.join(__dirname, '../node_modules/')
                },
                {
                    test: /\.css$/,
                    loader: cssLoader
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        postcss: [autoprefixer]
    };

    return Object.assign({}, defaultConfig, override(defaultConfig));
};
