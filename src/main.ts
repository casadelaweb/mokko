import 'restyle.css'
import 'restyle.css/dist/scrollbar.css'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'
import Modals from 'src/modules/modals/modals'
import { globalScrollController } from 'src/scripts/global-scroll-controller'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()

  const modals = new Modals({
    hooks: {
      open() {
        globalScrollController.updateDynamicSettings()
        globalScrollController.lock()
        globalScrollController.updateDynamicSettings()
      },
      close() {
        globalScrollController.updateDynamicSettings()
        if (this.parameters.counter === 0) globalScrollController.unlock()
        globalScrollController.updateDynamicSettings()
      },
    },
  })
  modals.init()
})
