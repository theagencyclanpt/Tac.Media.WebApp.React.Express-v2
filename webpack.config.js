const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const basePath = path.resolve(__dirname);
const dotenv = require('dotenv');
dotenv.config();

const _apiPort = process.env.API_PORT || 3000;
const _wwwPort = process.env.CLIENT_PORT || 3001;

module.exports = {
    entry: path.resolve(basePath, "src/www/index.tsx"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: "tsconfig.www.json"
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader', // postcss loader needed for tailwindcss
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [tailwindcss, autoprefixer],
                            },
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "styles.css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(basePath, 'src/www/static/index.html'),
            favicon: path.resolve(basePath, 'src/www/static/favicon.ico'),
            title: "Tac Template",
            description: "Tac Template"
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(basePath, 'src/www/static/robots.txt'), to: './' },
                { from: path.resolve(basePath, 'src/www/static/manifest.json'), to: './' }
            ],
        })
    ],
    output: {
        path: path.join(basePath, 'build', "www"),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "./tsconfig.www.json"
            })
        ]
    },
    devServer: {
        static: './build',
        compress: true,
        watchFiles: ['.src/www**'],
        hot: true,
        port: _wwwPort,
        proxy: {
            '/api': 'http://localhost:' + _apiPort,
            '/resources': 'http://localhost:' + _apiPort,
            '/temp': 'http://localhost:' + _apiPort,
        },
    }
};