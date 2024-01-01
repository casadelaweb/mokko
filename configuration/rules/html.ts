import htmlLoaderPipeline from '../html-loader-pipeline'
import { RuleSetRule } from 'node_modules/webpack'

function ruleHTML(): RuleSetRule {
  return {
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
      preprocessor: (content: any, loaderContext: any) => htmlLoaderPipeline(content, loaderContext),
    },
  }
}

export default ruleHTML
