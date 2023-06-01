document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const menu: HTMLElement = body.querySelector('.menu')
  const headerHeight: number = header.offsetHeight

  menu.style.top = headerHeight + 'px'

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
    // header.classList.remove('hovered')
    menu.classList.remove('active')
  })
})
