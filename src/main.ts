import 'restyle.css'
// import 'restyle.css/dist/scrollbar.css'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'
import Modals from 'src/modules/modals/modals'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import 'src/modules/details'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()
  globalScrollController.listen()

  const modals = new Modals({
    hooks: {
      beforeOpen() {
        globalScrollController.update()
      },
      open() {
        globalScrollController.lock()
        globalScrollController.update()
      },
      beforeClose() {
        globalScrollController.update()
      },
      close() {
        if (this.parameters.counter === 0) globalScrollController.unlock()
        globalScrollController.update()
      },
    },
  })
  modals.init()
})
