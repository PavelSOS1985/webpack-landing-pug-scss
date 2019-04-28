const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const config = {
    entry: {
        index: './src/pages/index/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/pages/index/index.pug",
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    'raw-loader',
                    'pug-html-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devServer = {
            overlay: true,
            hot: true,
            open: true,
            inline: true
        };
        config.devtool = 'source-map';
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        });
    }

    if (argv.mode === 'production') {
        config.plugins.push(new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }));
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        })
    }

    return config;

};
