// types
import type { Configuration } from 'node_modules/webpack'
import { iEnvVariables, iMode } from './configuration/config.types'

// node
import path from 'path'

// plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizer from 'css-minimizer-webpack-plugin'
import HTMLWebpackPluginPages from './configuration/HTMLWebpackPluginPages'

// rules
import ruleScripts from './configuration/rules/scripts'
import ruleFavicon from './configuration/rules/favicon'
import ruleStyles from './configuration/rules/styles'
import ruleIconfont from './configuration/rules/iconfont'
import ruleImages from './configuration/rules/images'
import ruleFonts from './configuration/rules/fonts'
import ruleHTML from './configuration/rules/html'

function config(env: iEnvVariables): Configuration {
  const mode: iMode = env.mode ?? 'development'
  const isDevelopmentMode = mode === 'development'
  const isProductionMode = !isDevelopmentMode
  
  const rootPath: string = path.resolve(__dirname, './') + '/'
  
  return {
    mode: mode,
    target: 'browserslist',
    devtool: isDevelopmentMode ? 'source-map' : false,
    optimization: {
      minimize: true,
      minimizer: isProductionMode ? ['...', new CssMinimizer(),] : [new CssMinimizer(),],
    },
    entry: { main: rootPath + 'src/main.ts', },
    output: {
      path: rootPath + 'dist',
      filename: 'assets/js/[name].[contenthash:4].js',
      clean: isProductionMode,
    },
    resolve: {
      alias: { 'src': rootPath + 'src', },
      extensions: [
        '.ts',
        '.js',
        '.json',
        '.wasm',
      ],
    },
    plugins: [
      ...HTMLWebpackPluginPages(rootPath, isProductionMode),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash:4].css',
        chunkFilename: 'assets/css/[name].[contenthash:4].css',
      }),
    ],
    module: {
      rules: [
        ruleHTML(rootPath),
        ruleFonts(rootPath),
        ruleIconfont(rootPath),
        ruleFavicon(rootPath),
        ruleImages(rootPath),
        ruleStyles(isDevelopmentMode),
        ruleScripts(rootPath),
      ],
    },
    watchOptions: {
      aggregateTimeout: 500,
      ignored: ['**/node_modules', '**/dist',],
    },
    // @ts-ignore
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
}

export default config
