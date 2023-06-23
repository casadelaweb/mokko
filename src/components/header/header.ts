import { menu } from 'src/scripts/menu-instance'
import { isMediaAboveLaptop } from 'src/scripts/helpers'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const headerHeight: number = header.offsetHeight
  const main: HTMLElement = body.querySelector('.main')

  const isPageIndex: string = body.getAttribute('data-page')

  if (isPageIndex !== 'index') {
    header.classList.add('active')
    main.style.marginTop = headerHeight + 'px'
  }

  header.addEventListener('mouseenter', () => {
    if (isMediaAboveLaptop()) {
      header.classList.add('hovered')
    }
  })
  header.addEventListener('mouseleave', () => {
    if (isMediaAboveLaptop() && !menu.elements.menu.matches('.active')) {
      header.classList.remove('hovered')
    }
  })

  function hoverHeader() {
    const { scrollY, } = window

    if (scrollY > headerHeight) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  }

  hoverHeader()
  window.addEventListener('scroll', hoverHeader)
})
