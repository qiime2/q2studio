const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function extendConfig(override, isDev) {
    var cssLoader = 'css-loader?modules&importLoaders=1' + // eslint-disable-line no-var
                    '&localIdentName=[name]--[local]-[hash:base64:5]!postcss-loader';
    var entry = [ // eslint-disable-line no-var
        path.resolve(__dirname, '../app/js/main.jsx')
    ];
    var jsx = { // eslint-disable-line no-var
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules/')
    };
    const autoprefixer = require('autoprefixer');
    if (!isDev) {
        cssLoader = ExtractTextPlugin.extract('style-loader', cssLoader);
    } else {
        cssLoader = `style-loader!${cssLoader}`;
        entry = [
            'webpack-dev-server/client?http://localhost:4242',
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, '../app/js/main.jsx')
        ];
        jsx = {
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader'],
            exclude: path.join(__dirname, '../node_modules/')
        };
    }

    const defaultConfig = {
        entry,
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
                jsx,
                {
                    test: /\.css$/,
                    loader: cssLoader
                }
            ]
        },
        postcss: [autoprefixer]
    };

    return Object.assign({}, defaultConfig, override(defaultConfig));
};
