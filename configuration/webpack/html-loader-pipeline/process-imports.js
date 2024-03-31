import { resolve } from 'path'
import { readFileSync } from 'fs'

export default function processImports(match, source) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const loaderContext = this

  source = source.replace(/^src\//gmi, '../src/')

  const dir = loaderContext.context.replace(/public.*/gmi, 'public')


  const filePath = resolve(dir, source)
  return readFileSync(filePath, 'utf8')
}
