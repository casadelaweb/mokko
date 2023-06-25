import Modals from 'src/modules/modals/modals'
import { globalScrollController } from 'src/scripts/global-scroll-controller'

export const modals = new Modals({
  hooks: {
    beforeOpen() {
      if (this.parameters.counter === 0) globalScrollController.update()
    },
    open() {
      globalScrollController.lock()
      if (this.parameters.counter === 0) globalScrollController.update()
    },
    // beforeClose() {
    //   if (this.parameters.counter === 0) globalScrollController.update()
    // },
    close() {
      if (this.parameters.counter === 0) {
        globalScrollController.unlock()
        globalScrollController.update()
      }
    },
  },
})
