import 'restyle.css'
import 'restyle.css/dist/scrollbar.css'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()
})
