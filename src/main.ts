import 'restyle.css/dist/restyle.css'
import 'restyle.css/dist/checkboxes.css'
import 'swiper/scss'
import 'swiper/scss/a11y'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'
import { modals } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { Select } from 'src/modules/select/select'
import { Details } from 'src/modules/details/details'
import { Masks } from 'src/modules/masks/masks'
import { Calendar } from 'src/modules/calendar/calendar'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()
  globalScrollController.init()
  modals.init()
  new Select().init()
  new Details().init()
  new Masks().init()
  new Calendar().init()
})
