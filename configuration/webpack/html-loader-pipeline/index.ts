import processRepeat from './process-repeat.js'
import processAliases from './process-aliases.js'
import processImports from './process-imports.js'

const tests = {
  imports: / *?import +'?"?(.*?)'?"? *?;/gmi,
  repeats: / *?repeat +(\d\d?) +times:([\s\S]*?)end;/gmi,
  aliases: /(src|href|data-src|data-bg|srcset|poster|content)="(.*?)"/gmi,
}

function htmlLoaderPipeline(content: any, loaderContext: any) {

  let result = content

  if (tests.imports.test(result)) {
    result = result.replace(tests.imports, processImports.bind(loaderContext))
  }

  if (tests.aliases.test(result)) {
    result = result.replace(tests.aliases, processAliases.bind(loaderContext))
  }
  if (tests.repeats.test(result)) {
    result = result.replace(tests.repeats, processRepeat)
  }

  if (tests.imports.test(result)) {
    result = result.replace(tests.imports, processImports.bind(loaderContext))
  }

  if (tests.aliases.test(result)) {
    result = result.replace(tests.aliases, processAliases.bind(loaderContext))
  }

  return result
}

export default htmlLoaderPipeline
