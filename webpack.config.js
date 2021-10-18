const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/example/index.tsx'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    },
                ],
                exclude: /(node_modules|build)/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash:8].js',
        chunkFilename: '[id].[hash:8].js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: {
                    reuseExistingChunk: true
                },
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'PF React',
            chunksSortMode: 'none',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            minify: true
        })
    ],

    devServer: {
        port: 1235,
        historyApiFallback: true,
        open:true
    }
};