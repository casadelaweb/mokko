const fs = require('fs')
const path = require('path')
const pathRoot = (directory) => path.resolve(__dirname, directory)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const isDevelopmentMode = mode === 'development'
const isProductionMode = !isDevelopmentMode

const stylesPipeline = {
  development: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
  ],
  production: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: { postcssOptions: { plugins: [ 'postcss-preset-env', ], }, },
    },
    'sass-loader',
  ],
}
const scriptsRuleset = {
  test: /\.(js|ts)$/,
  exclude: /(node_modules|dist|.vscode|.idea)/,
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
const htmlPages = fs.readdirSync(pathRoot('public')).filter(fileName => fileName.endsWith('.html'))
const htmlPagesRegistered = htmlPages.map((page) => new HtmlWebpackPlugin({
  filename: './' + page,
  template: './public/' + page,
  scriptLoading: 'blocking',
  inject: 'body',
  minify: {
    collapseWhitespace: false,
    keepClosingSlash: false,
    removeComments: isProductionMode,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
}))

module.exports = {
  mode: mode,
  target: 'browserslist',
  devtool: isDevelopmentMode ? 'source-map' : false,
  optimization: { minimize: isProductionMode, },
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
          preprocessor: (content, loaderContext) => {
            let result = content

            function processRepeat(match, number, content) {
              const times = Number(number)
              match = content.repeat(times)
              return match
            }

            result = result.replace(/ *?repeat +(\d\d?) +times:([\s\S]*?)end;/gmi, processRepeat)

            // src alias для папки ../src
            function processAliases(match, attribute) {
              const attributesToMatch = [
                'href',
                'src',
                'data-src',
                'data-bg',
                'srcset',
              ]
              if (attributesToMatch.includes(attribute)) {
                match = match.replace(/(src|href|data-src|data-bg|srcset)="src/gmi, attribute + '="' + path.resolve(__dirname, './src') + '')
              }
              return match
            }

            result = result.replace(/(src|href|data-src|data-bg|srcset)="(.*?)"/gmi, processAliases)

            function processImports(match, source) {
              source = source.replace(/^src\//gmi, '../src/')

              const filePath = path.resolve(loaderContext.context, source)
              let fileContent = fs.readFileSync(filePath, 'utf8')

              fileContent = fileContent.replace(/ *?repeat +(\d\d?) +times:([\s\S]*?)end;/gmi, processRepeat)

              fileContent = fileContent.replace(/(src|href|data-src|data-bg|srcset)="(.*?)"/gmi, processAliases)

              return fileContent
            }

            result = result.replace(/ *?import +'?"?(.*?)'?"? *?;/gmi, processImports)
            return result
          },
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
        // include: [
        //   pathRoot('src/assets/img'),
        //   pathRoot('src/components'),
        //   pathRoot('src/modules'),
        // ],
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
    ignored: [
      '**/node_modules',
      '**/dist',
    ],
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
