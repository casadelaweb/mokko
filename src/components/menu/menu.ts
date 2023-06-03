import { globalScrollController } from 'src/scripts/global-scroll-controller'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const menu: HTMLElement = body.querySelector('.menu')
  const headerHeight: number = header.offsetHeight

  function updateMenuStyles() {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      menu.style.top = headerHeight + 'px'
    } else {
      menu.style.top = '0px'
    }
  }

  window.addEventListener('resize', updateMenuStyles)
  updateMenuStyles()

  const catalogLink: HTMLElement = header.querySelector('[data-header=catalog]')
  const headerLinks: HTMLElement[] = [
    ...header.querySelectorAll('a'),
    ...header.querySelectorAll('button'),
  ]

  headerLinks.forEach((button) => {
    if (!button.matches('[data-header=catalog]')) {
      button.addEventListener('mouseenter', () => {
        if (window.matchMedia('(min-width: 1280px)').matches) {
          menu.classList.remove('active')
        }
      })
    }
  })

  catalogLink.addEventListener('mouseenter', () => {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      header.classList.add('hovered')
      menu.classList.add('active')
    }
  })
  menu.addEventListener('mouseleave', () => {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      menu.classList.remove('active')
    }
  })

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.closest('[data-menu=open]')) {
      menu.classList.add('active')
      globalScrollController.update()
      globalScrollController.lock()
    }
    if (target.closest('[data-menu=close]')) {
      menu.classList.remove('active')
      globalScrollController.update()
      globalScrollController.unlock()
    }
  })
})
