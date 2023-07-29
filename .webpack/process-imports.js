const path = require('path')
const fs = require('fs')

module.exports = function processImports(match, source) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const loaderContext = this

  source = source.replace(/^src\//gmi, '../src/')

  const dir = loaderContext.context.replace(/public.*/gmi, 'public')
  // console.log(dir, source)

  const filePath = path.resolve(dir, source)
  return fs.readFileSync(filePath, 'utf8')
}
