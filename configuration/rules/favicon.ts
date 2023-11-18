import { RuleSetRule } from 'node_modules/webpack'

function ruleFavicon(rootPath: string): RuleSetRule {
  return {
    test: /(ico|png|webmanifest|svg|xml)$/i,
    include: rootPath + 'src/assets/favicon',
    exclude: rootPath + 'src/assets/img',
    type: 'asset/resource',
    generator: { filename: '../[name][ext]', },
  }
}

export default ruleFavicon
