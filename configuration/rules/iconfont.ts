import { RuleSetRule } from 'node_modules/webpack'

function ruleIconfont(rootPath: string): RuleSetRule {
  return {
    test: /(.*?iconfont.*?)\.(svg|woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    include: /iconfont|iconfonts/,
    exclude: /fonts|img|images/,
    generator: { filename: 'assets/iconfont/[name].[contenthash:4][ext]', },
  }
}

export default ruleIconfont
