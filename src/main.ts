import 'restyle.css'
import 'restyle.css/dist/checkboxes.css'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'
import { modals } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { Select } from 'src/modules/select/select'
import { Details } from 'src/modules/details/details'
import { Masks } from 'src/modules/masks/masks'
import { Tooltip } from 'src/modules/tooltip/tooltip'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()
  globalScrollController.listen()
  modals.init()
  new Select().init()
  new Details().init()
  new Masks().init()

  const tooltip = new Tooltip()
  tooltip.init()

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.closest('.profile-input')) {
      tooltip.hide()
      tooltip.position(target.closest('.profile-input'))
      tooltip.show()
    }
  })
})
