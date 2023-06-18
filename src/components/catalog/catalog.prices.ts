import * as noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import './no-ui-slider.scss'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document

  const pricesContainer = body.querySelector('#prices')

  if (pricesContainer) {
    noUiSlider.create(pricesContainer, {
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
  }
})
