import { globalScrollController } from 'src/scripts/global-scroll-controller'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const menu: HTMLElement = body.querySelector('.menu')
  const headerHeight: number = header.offsetHeight

  function updateMenuStyles() {
    const mediaQuery = window.matchMedia('(min-width: 1280px)')
    if (mediaQuery.matches) {
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
        menu.classList.remove('active')
      })
    }
  })

  catalogLink.addEventListener('mouseenter', () => {
    header.classList.add('hovered')
    menu.classList.add('active')
  })
  menu.addEventListener('mouseleave', () => {
    menu.classList.remove('active')
  })

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('[data-menu=open]')) {
      menu.classList.add('active')
      globalScrollController.lock()
    }
    if (target.closest('[data-menu=close]')) {
      menu.classList.remove('active')
      globalScrollController.unlock()
    }
    if (target.closest('.menu-mobile-list-button')) {
      const button = target.closest('.menu-mobile-list-button')
      const list = button.closest('.menu-mobile-list')
      const listBody = list.querySelector('.menu-mobile-list-body')
      list.classList.toggle('active')
      listBody.classList.toggle('active')
    }
  })
})
