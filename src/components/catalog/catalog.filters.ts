import { modals } from 'src/scripts/modals-instance'
import { modalsAside } from 'src/modules/modals/modals.aside'
import * as noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import './no-ui-slider.scss'

document.addEventListener('DOMContentLoaded', () => {
  modalsAside(modals, '[data-modal=catalog-filters]')
  
  const { body, } = document

  const prices: HTMLElement[] = Array.from(body.querySelectorAll('[data-catalog-prices]'))

  if (prices.length > 0) {
    prices.forEach((element: HTMLElement) => {
      noUiSlider.create(element, {
        start: [
          0,
          100,
        ],
        connect: true,
        range: {
          'min': 0,
          'max': 100,
        },
      })
    })
  }
})
