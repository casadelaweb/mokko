const path = require('path')

module.exports = function processAliases(match, attribute) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const loaderContext = this
  const filePath = loaderContext.resourcePath

  // console.log(path.resolve(__dirname, filePath).replace(/.*public/gmi, ''))
  const pathFromPublic = path.dirname(filePath).replace(/.*public/gmi, '')
  const depth = (pathFromPublic.match(/\\/g) || []).length + 1

  const pathPrefix = '../'.repeat(depth)
  const pathFromRoot = pathPrefix + 'src'
  // console.log(filePath, pathFromPublic, depth, pathFromRoot)

  const attributesToMatch = [
    'href',
    'src',
    'data-src',
    'data-bg',
    'srcset',
    'poster',
  ]
  if (attributesToMatch.includes(attribute)) {
    match = match.replace(/(src|href|data-src|data-bg|srcset|poster)="src/gmi, attribute + `="${ pathFromRoot }`)
  }
  return match
}
