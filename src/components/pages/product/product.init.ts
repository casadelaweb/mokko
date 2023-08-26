import { isMediaAboveLaptop } from 'src/scripts/helpers'

document.addEventListener('DOMContentLoaded', () => {
  const {body,} = document
  const header: HTMLElement = body.querySelector('.header')
  const headerHeight: number = header.offsetHeight
  const catalogDetailSticky: HTMLElement = body.querySelector('[data-product=sticky]')

  if (catalogDetailSticky) {
    window.addEventListener('resize', () => {
      if (isMediaAboveLaptop()) {
        catalogDetailSticky.style.top = headerHeight + 20 + 'px'
      }
    })
  }
})
