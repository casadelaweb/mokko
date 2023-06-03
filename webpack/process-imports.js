const path = require('path')
const fs = require('fs')
const processRepeat = require('./process-repeat')
const processAliases = require('./process-aliases')

module.exports = function processImports(match, source) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const loaderContext = this

  source = source.replace(/^src\//gmi, '../src/')

  const filePath = path.resolve(loaderContext.context, source)
  let fileContent = fs.readFileSync(filePath, 'utf8')

  fileContent = fileContent.replace(/ *?repeat +(\d\d?) +times:([\s\S]*?)end;/gmi, processRepeat)

  fileContent = fileContent.replace(/(src|href|data-src|data-bg|srcset)="(.*?)"/gmi, processAliases)

  return fileContent
}
