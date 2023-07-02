import Modals from 'src/modules/modals/modals'
import { globalScrollController } from 'src/scripts/global-scroll-controller'

export const modals = new Modals({
  hooks: {
    beforeOpen() {

      if (this.parameters.all.length === 0) globalScrollController.update()
    },
    open() {
      globalScrollController.lock()
      if (this.parameters.all.length === 0) globalScrollController.update()
      // console.log(this)
    },
    // beforeClose() {
    //   if (this.parameters.all.length === 0) globalScrollController.update()
    // },
    close() {
      if (this.parameters.all.length === 0) {
        globalScrollController.unlock()
        globalScrollController.update()
      }
      // console.log(this)
    },
  },
})
