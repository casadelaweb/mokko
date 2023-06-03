const processRepeat = require('./process-repeat')
const processAliases = require('./process-aliases')
const processImports = require('./process-imports')

module.exports = function htmlLoaderPipeline(content, loaderContext) {
  let result = content

  result = result.replace(/ *?repeat +(\d\d?) +times:([\s\S]*?)end;/gmi, processRepeat)
  result = result.replace(/(src|href|data-src|data-bg|srcset)="(.*?)"/gmi, processAliases)
  result = result.replace(/ *?import +'?"?(.*?)'?"? *?;/gmi, processImports.bind(loaderContext))
  return result
}

