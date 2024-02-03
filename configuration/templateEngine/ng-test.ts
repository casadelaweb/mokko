import * as fs from 'fs'
import * as path from 'path'

interface PageInfo {
  pageContent: string,
  pathFromSrcFolder: string,
  fileSystemFullPath: string,
  depthRelativelyPagesFolder: number,
}

function getPageContent(pathFromSrcFolder: string, depthRelativelyPagesFolder: number): string {
  const fileSystemFullPath = path.join(__dirname, '..', 'src', 'views', 'pages', pathFromSrcFolder)
  return fs.readFileSync(fileSystemFullPath, 'utf-8')
}

// function findForEach(content: string): boolean {
//   // Search for 'forEach' occurrences in content
//   // return true if found, false otherwise
// }

function getAllHtmlContent(directory: string, depth: number): PageInfo[] {
  const result: PageInfo[] = []

  const fileNames = fs.readdirSync(directory)
  fileNames.forEach((fileName) => {
    const fullPath = path.join(directory, fileName)
    const stats = fs.statSync(fullPath)

    if (stats.isFile() && fileName.endsWith('.html')) {
      const relativePath = path.relative(path.join(__dirname, '..', 'src', 'views', 'pages'), fullPath)
      const content = getPageContent(relativePath, depth)

      result.push({
        pageContent: content,
        pathFromSrcFolder: relativePath,
        fileSystemFullPath: fullPath,
        depthRelativelyPagesFolder: depth,
      })

      // if (findForEach(content)) {
      // }
    } else if (stats.isDirectory() && fileName !== 'node_modules') {
      result.push(...getAllHtmlContent(fullPath, depth + 1))
    }
  })

  return result
}

const pagesContent = getAllHtmlContent(path.join(__dirname, '..', 'src', 'views', 'pages'), 0)
console.log(pagesContent)
