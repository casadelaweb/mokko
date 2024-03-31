import HTMLWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import fs from 'fs'

const Files = []

function ThroughDirectory(Directory: string) {
  fs.readdirSync(Directory).forEach(File => {

    const Absolute = path.join(Directory, File)
    if (Absolute.includes('@')) return

    if (fs.statSync(Absolute).isDirectory()) {
      return ThroughDirectory(Absolute)
    } else {
      if (Absolute.endsWith('.html')) {
        const pathRelative = Absolute.replace(path.resolve('public'), '').replace(path.basename(Absolute), '')
        const result = {
          fileName: path.basename(Absolute),
          pathRelative,
        }
        return Files.push(result)
      }
    }
  })
}

function HTMLWebpackPluginPages(rootPath: string, isProductionMode: boolean) {
  ThroughDirectory(rootPath + 'public')

  return Files.map((page) => {
    return new HTMLWebpackPlugin({
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
}

export default HTMLWebpackPluginPages
