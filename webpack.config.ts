// types
import type { Configuration } from 'node_modules/webpack'
import { iEnvVariables, iMode } from './configuration/config.types'
// node
import path from 'path'
// plugins
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
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
import { EsbuildPlugin } from 'esbuild-loader'

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
      minimize: isProductionMode,
      minimizer: [
        new EsbuildPlugin({
          target: 'es2015',
          css: true,
          legalComments: 'none',
        }),
      ],
    },
    entry: { main: rootPath + 'src/main.ts', },
    output: {
      path: rootPath + 'public/assets',
      filename: 'js/[name].js?v=[contenthash:8]',
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
      //...HTMLWebpackPluginPages(rootPath, isProductionMode),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css?v=[contenthash:8]',
        chunkFilename: 'css/[name].css?v=[contenthash:8]',
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
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
      ],
    },
    watchOptions,
    // @ts-ignore
    devServer,
  }
}

export default config
