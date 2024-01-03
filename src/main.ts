import 'restyle.css/dist/restyle.css'
import 'restyle.css/dist/checkboxes.css'
import 'swiper/scss'
import 'swiper/scss/a11y'
import 'swiper/scss/scrollbar'
import 'src/styles/main.scss'
import 'src/components'
import { modals } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { Select } from 'src/modules/select/select'
import { Details } from 'src/modules/details/details'
import { Masks } from 'src/modules/masks/masks'
import { Calendar } from 'src/modules/calendar/calendar'
import { Stories } from 'src/modules/stories/stories'
//import { createApp } from 'vue'
//import notificationsQueue from 'src/modules/notificationsQueue/notificationsQueue.vue'
import 'src/assets/img/placeholder.jpg'

document.addEventListener('DOMContentLoaded', () => {
  globalScrollController.init()
  modals.init()
  new Select().init()
  new Details().init()
  new Masks().init()
  new Calendar().init()
  new Stories().init()

  // const el: HTMLElement = document.querySelector('#notifications-queue')
  // if (el) {
  //   createApp(notificationsQueue).mount('#notifications-queue')
  // }
}, { passive: true, })
