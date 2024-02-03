const fs = require('fs')
const path = require('path')

function getAllHtmlContent(dir, depth = 0) {
  const dirPath = path.join(__dirname, dir)
  let result = []

  // Получаем все элементы в указанной директории
  const items = fs.readdirSync(dirPath, { withFileTypes: true, })

  items.forEach((item) => {
    const itemPath = path.join(dirPath, item.name)
    const relativePath = path.relative(__dirname, itemPath)
    const depthRelativelySrcViewsPagesFolder = relativePath.split(path.sep).length - 3

    if (item.isDirectory()) {
      // Рекурсивно получаем контент вложенных директорий
      result = result.concat(getAllHtmlContent(itemPath, depth + 1))
    } else if (item.isFile() && path.extname(item.name) === '.html') {
      // Получаем контент html-файлов
      const pageContent = fs.readFileSync(itemPath, 'utf8')

      // Добавляем объект в массив результатов
      result.push({
        pageContent,
        pathFromSrcFolder: path.relative('src', itemPath),
        fileSystemFullPath: itemPath,
        depthRelativelySrcViewsPagesFolder,
      })
    }
  })

  return result
}

function writeHtmlFiles(contentArray) {
  contentArray.forEach((item) => {
    const outputPath = path.join(__dirname, 'src', 'views', 'build', item.pathFromSrcFolder)

    // Создаем директорию если она не существует
    fs.mkdirSync(path.dirname(outputPath), { recursive: true, })

    // Записываем контент в html-файл
    fs.writeFileSync(outputPath, item.pageContent)
  })
}

// Пример использования
const htmlContent = getAllHtmlContent('./src/views/pages')
console.log(htmlContent)

setTimeout(() => {
  writeHtmlFiles(htmlContent)
  console.log('Html files have been written successfully.')
}, 2000) // Чтобы увидеть результаты, задержим выполнение функции записи на 2 секунды
