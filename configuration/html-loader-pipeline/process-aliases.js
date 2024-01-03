import { dirname } from 'path'

export default function processAliases(match, attribute) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const loaderContext = this
  const filePath = loaderContext.resourcePath


  const pathFromPublic = dirname(filePath).replace(/.*public/gmi, '')
  const depth = (pathFromPublic.match(/\\/g) || []).length + 1

  const pathPrefix = '../'.repeat(depth)
  const pathFromRoot = pathPrefix + 'src'


  const attributesToMatch = [
    'href',
    'src',
    'data-src',
    'data-bg',
    'srcset',
    'poster',
    'content',
  ]
  if (attributesToMatch.includes(attribute)) {
    match = match.replace(/(src|href|data-src|data-bg|srcset|poster|content)="src/gmi, attribute + `="${pathFromRoot}`)
  }
  return match
}
