import { menu } from 'src/scripts/menu-instance'
import { isMediaAboveLaptop } from 'src/scripts/helpers'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const headerHeight: number = header.offsetHeight
  const main: HTMLElement = body.querySelector('.main')

  const isPageIndex: string = body.getAttribute('data-page')

  if (isPageIndex === 'index') {
    main.style.marginTop = '0px'
  } else {
    header.classList.add('active')
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

  function updateHeaderHeight(): void {
    const { body, documentElement: html, } = document
    const header: HTMLElement = body.querySelector('.header')
    const headerHeight: string = header.offsetHeight + 'px'
    html.style.setProperty('--headerHeight', headerHeight)
  }

  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)

  function hoverHeader(): void {
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
