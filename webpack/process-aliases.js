const path = require('path')

module.exports = function processAliases(match, attribute) {
  const attributesToMatch = [
    'href',
    'src',
    'data-src',
    'data-bg',
    'srcset',
  ]
  if (attributesToMatch.includes(attribute)) {
    /* match = match.replace(/(src|href|data-src|data-bg|srcset)="src/gmi, attribute + '="' + path.resolve(__dirname, './src') + '') */
    match = match.replace(/(src|href|data-src|data-bg|srcset)="src/gmi, attribute + '="../src')
  }
  return match
}
