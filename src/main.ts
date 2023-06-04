import 'restyle.css'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'
import { modals } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import 'src/modules/details'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()
  globalScrollController.listen()
  modals.init()
})
