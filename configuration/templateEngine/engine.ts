// class TemplateEngine {
//   constructor(content: string, loaderContext: object) {
//   }
//
//   render(template: string): string {
//     const variableRegex = /{{\s*(\w+)\s*}}/g
//     const forLoopRegex = /{%\s*for\s+(\w+)\s+in\s+(\w+)\s*%}([\s\S]*?){%\s*endfor\s*%}/g
//     const foreachLoopRegex = /{%\s*foreach\s+(\w+)\s+as\s+(\w+)\s*%}([\s\S]*?){%\s*endforeach\s*%}/g
//
//     // Replace variable placeholders
//     template = template.replace(variableRegex, (match, variable) => {
//       return this.data[variable] || ''
//     })
//
//     // Process for loops
//     template = template.replace(forLoopRegex, (match, itemVariable, arrayVariable, loopContent) => {
//       const array = this.data[arrayVariable] || []
//       let result = ''
//
//       for (let i = 0; i < array.length; i++) {
//         const item = array[i]
//         const itemData = {
//           ...this.data,
//           [itemVariable]: item,
//         }
//         result += new TemplateEngine(itemData).render(loopContent)
//       }
//
//       return result
//     })
//
//     // Process foreach loops
//     template = template.replace(foreachLoopRegex, (match, arrayVariable, elementVariable, loopContent) => {
//       const array = this.data[arrayVariable] || []
//       let result = ''
//
//       array.forEach((element: any) => {
//         const elementData = {
//           ...this.data,
//           [elementVariable]: element,
//         }
//         result += new TemplateEngine(elementData).render(loopContent)
//       })
//
//       return result
//     })
//
//     return template
//   }
// }

import fs from 'fs'

interface iRenderArgs {
  viewName: string,
  params: object
}

function tbsEngine(content: string, loaderContext: object): string {
  function findRenderViews(str: string): iRenderArgs[] {
    const regex = /@renderView\((.*),\s({[^}]*})\)/g
    const matches = str.matchAll(regex)
    const renderViews: iRenderArgs[] = []

    for (const match of matches) {
      const viewName = match[1].trim()
      const paramsString = match[2].trim().replace(/'/gmi, '"')
      const params = JSON.parse(paramsString)

      fs.writeFile('./test.txt', paramsString, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log('The file was saved!')
      })

      renderViews.push({
        viewName,
        params,
      })
    }

    return renderViews
  }

  function renderView(html: string, variables: object): string {
    // Поиск и замена переменных
    const regex = /{{\s*([A-Za-z_]+[A-Za-z0-9_]*)\s*}}/g
    html = html.replace(regex, (match, variable) => {
      return variables[variable] || match
    })

    // Поиск и замена циклов
    const loopRegex = /@foreach\s*\(\s*([A-Za-z_]+[A-Za-z0-9_]*)\s*as\s*([A-Za-z_]+[A-Za-z0-9_]*)\s*\):\s*(.*?)\s*@endforeach\s*;/gs
    html = html.replace(loopRegex, (match, arrayName, itemName, content) => {
      const array = variables[arrayName] || []
      let loopedContent = ''
      for (const item of array) {
        loopedContent += renderView(content, {
          ...variables,
          [itemName]: item,
        })
      }
      return loopedContent
    })

    return html
  }

  //const { template_name, params, } = findTemplateAndParams(content)
  const renderCalls: iRenderArgs[] = findRenderViews(content)

  renderCalls.forEach((call) => {
    const { viewName, params, } = call

    const view = fs.readFileSync(`./src/views/${viewName}.hts`, 'utf8')

    console.log(renderView(view, params))
  })
  //console.log(template_name, params)
  //return renderView(template_name, params)
  return content
}

export default tbsEngine
