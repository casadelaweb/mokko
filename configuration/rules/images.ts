import { RuleSetRule } from 'node_modules/webpack'

function ruleImages(): RuleSetRule {
  return {
    test: /(jpg|jpeg|png|webp|gif|svg)$/i,
    exclude: /iconfont|iconfonts|fonts|favicon/,
    type: 'asset/resource',
    generator: {
      filename: (pathData: { filename: any }) => {
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
  }
}

export default ruleImages
