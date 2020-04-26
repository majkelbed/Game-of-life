const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development" ? true : false;
  return ({
    mode: isDevelopment ? 'development' : 'production',
    watch: isDevelopment,
    entry: {
      polyfill: "@babel/polyfill",
      main: "./src/main.ts"
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: __dirname + "/public/build"
    },
    resolve: {
      alias: {
        "svelte": path.resolve('node_modules', 'svelte'),
        "@Components": path.resolve(__dirname, 'src/components'),
        "@Functions": path.resolve(__dirname, 'src/functions'),
        "@Types": path.resolve(__dirname, 'src/types'),
      },
      extensions: [".mjs", ".ts", ".js", ".scss", '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main']
    },
    devtool: isDevelopment ? "source-map" : "",
    module: {
      rules: [
        {
          test: /\.(mjs|jsx?)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(html|svelte)$/,
          // exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              preprocess: require('svelte-preprocess')({ 
                typescript: {
                  tsconfigDirectory: './',
                  tsconfigFile: './tsconfig.json',
                }
               })
            },
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader, // inject CSS to page
            },
            {
              loader: 'css-loader?url=false', // translates CSS into CommonJS modules
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                config: {
                  path: './'
                },
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader' // compiles Sass to CSS
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(png|jp(e*)g)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
            }
          }]
        }
      ]
    },
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: isDevelopment ? [] : [
        new TerserPlugin(),
        new webpack.ContextReplacementPlugin(
          /moment[/\\]locale$/,
          /de|fr|hu/
        )
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDevelopment ? 'bundle.css' : 'bundle.css'
      }),
      new WebpackBuildNotifierPlugin({
        title: "Success",
        logo: path.resolve("./img/favicon.png")
      })
    ]
  })
};