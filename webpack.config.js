const fs = require('fs')
const path = require('path')
const pathRoot = (directory) => path.resolve(__dirname, directory)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizer = require('css-minimizer-webpack-plugin')
const mode = process.env.NODE_ENV || 'development'
const isDevelopmentMode = mode === 'development'
const isProductionMode = !isDevelopmentMode

const htmlLoaderPipeline = require('./.webpack/html-loader-pipeline')

const stylesPipeline = {
  development: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'sass-loader',
      options: { implementation: require('sass'), },
    },
  ],
  production: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: { postcssOptions: { plugins: ['postcss-preset-env',], }, },
    },
    {
      loader: 'sass-loader',
      options: { implementation: require('sass'), },
    },
  ],
}
const scriptsRuleset = {
  test: /\.(js|ts)$/,
  exclude: /(node_modules|dist|.vscode|.idea|.github|.webpack)/,
  use: {
    loader: 'swc-loader',
    options: {
      minify: false,
      jsc: {
        target: 'es2015',
        loose: false,
        minify: {
          compress: false,
          mangle: false,
        },
      },
    },
  },
}

const Files = []

function ThroughDirectory(Directory) {
  fs.readdirSync(Directory).forEach(File => {
    // console.log(Directory)
    const Absolute = path.join(Directory, File)
    if (Absolute.includes('@')) return

    if (fs.statSync(Absolute).isDirectory()) {
      return ThroughDirectory(Absolute)
    } else {
      if (Absolute.endsWith('.html')) {
        const pathRelative = Absolute.replace(pathRoot('public'), '').replace(path.basename(Absolute), '')
        const result = {
          fileName: path.basename(Absolute),
          pathRelative,
        }
        return Files.push(result)
      }
    }
  })
}

ThroughDirectory(pathRoot('public'))
// console.log(Files)


// const htmlPages = fs.readdirSync(pathRoot('public')).filter(fileName => {
//   console.log(fileName)
//   return fileName.endsWith('.html')
// })
const htmlPagesRegistered = Files.map((page) => {
  return new HtmlWebpackPlugin({
    filename: './' + page.pathRelative + page.fileName,
    template: './public/' + page.pathRelative + page.fileName,
    scriptLoading: 'blocking',
    inject: 'body',
    minify: {
      collapseWhitespace: false,
      keepClosingSlash: false,
      removeComments: isProductionMode,
      removeRedundantAttributes: false,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: false,
    },
  })
})

module.exports = {
  mode: mode,
  target: 'browserslist',
  devtool: isDevelopmentMode ? 'source-map' : false,
  optimization: {
    minimize: true,
    minimizer: isProductionMode ? ['...', new CssMinimizer(),] : [new CssMinimizer(),],
  },
  entry: { main: pathRoot('src/main.ts'), },
  output: {
    path: pathRoot('dist/'),
    filename: 'assets/js/[name].[contenthash:4].js',
    clean: isProductionMode,
  },
  resolve: {
    alias: { 'src': pathRoot('./src'), },
    extensions: [
      '.ts',
      '.js',
      '.json',
      '.wasm',
    ],
  },
  plugins: [
    ...htmlPagesRegistered,
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:4].css',
      chunkFilename: 'assets/css/[name].[contenthash:4].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html|php$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'div',
                attribute: 'data-bg',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset',
              },
            ],
          },
          minimize: false,
          preprocessor: (content, loaderContext) => htmlLoaderPipeline(content, loaderContext),
        },
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: isDevelopmentMode ? stylesPipeline.development : stylesPipeline.production,
      },
      scriptsRuleset,
      {
        test: /(.*?iconfont.svg)|.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]', },
      },
      {
        test: /(jpg|jpeg|png|webp|gif|svg)$/i,
        exclude: pathRoot('src/assets/favicon'),
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const { filename, } = pathData
            let result = filename
            const queries = [
              {
                searchFor: 'src/assets/',
                replaceWith: 'assets/',
              },
              {
                searchFor: 'src/modules/',
                replaceWith: 'assets/img/',
              },
              {
                searchFor: 'src/components/',
                replaceWith: 'assets/img/',
              },
            ]
            queries.forEach((query) => {
              result = result.replace(query.searchFor, query.replaceWith)
            })
            return result
          },
        },
      },
      {
        test: /(ico|png|webmanifest|svg|xml)$/i,
        include: pathRoot('src/assets/favicon'),
        exclude: pathRoot('src/assets/img'),
        type: 'asset/resource',
        generator: { filename: '../[name][ext]', },
      },
    ],
  },
  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['**/node_modules', '**/dist',],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
}
