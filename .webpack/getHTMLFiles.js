const fs = require('fs')
const path = require('path')

module.exports = function getHTMLFiles(directory) {
  const filesArray = []

  fs.readdirSync(directory).forEach(File => {
    const absolute = path.join(directory, File)
    if (absolute.includes('@')) return

    if (fs.statSync(absolute).isDirectory()) {
      // если нашли папку, вызываем себя рекурсивно
      return getHTMLFiles(absolute)
    } else {
      // если нашли HTML файл
      if (absolute.endsWith('.html')) {
        const pathRelative = absolute.replace(path.resolve(__dirname, 'public'), '').replace(path.basename(absolute), '')
        const result = {
          fileName: path.basename(absolute),
          pathRelative,
        }
        // возвращаем объект с именем файла и путем к нему
        return filesArray.push(result)
      }
    }
  })

  return filesArray
}
