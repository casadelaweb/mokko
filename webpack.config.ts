// types
import type { Configuration } from 'node_modules/webpack'
import { iEnvVariables, iMode } from './configuration/config.types'
// node
import path from 'path'
// plugins
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizer from 'css-minimizer-webpack-plugin'
import HTMLWebpackPluginPages from './configuration/HTMLWebpackPluginPages'
import { VueLoaderPlugin } from 'vue-loader'
// rules
import ruleVue from './configuration/rules/vue'
import ruleScripts from './configuration/rules/scripts'
import ruleFavicon from './configuration/rules/favicon'
import ruleStyles from './configuration/rules/styles'
import ruleIconfont from './configuration/rules/iconfont'
import ruleImages from './configuration/rules/images'
import ruleFonts from './configuration/rules/fonts'
import ruleHTML from './configuration/rules/html'
import devServer from './configuration/devServer'
import watchOptions from './configuration/watchOptions'
import htmlLoaderPipeline from './configuration/html-loader-pipeline'
import tshEngine from './configuration/templateEngine/engine'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { isLocalFile } from '@swc/core/spack'

function config(env: iEnvVariables): Configuration {
  const mode: iMode = env.mode ?? 'development'
  const isDevelopmentMode: boolean = mode === 'development'
  const isProductionMode: boolean = !isDevelopmentMode

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
      filename: 'assets/js/[name].js?v=[contenthash:8]',
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
        filename: 'assets/css/[name].css?v=[contenthash:8]',
        chunkFilename: 'assets/css/[name].css?v=[contenthash:8]',
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
      new HTMLWebpackPlugin({
        filename: './test.html',
        template: './src/views/index.tsh',
        scriptLoading: 'blocking',
        inject: 'body',
        minify: false,
      }),
    ],
    module: {
      rules: [
        ruleVue(),
        ruleHTML(),
        ruleFonts(),
        ruleIconfont(),
        ruleFavicon(),
        ruleImages(),
        ruleStyles(isDevelopmentMode),
        ruleScripts(),
        {
          test: /\.tsh$/i,
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
            preprocessor: (content: any, loaderContext: any) => tshEngine(content, loaderContext),
          },
        },
      ],
    },
    watchOptions,
    // @ts-ignore
    devServer,
  }
}

export default config
