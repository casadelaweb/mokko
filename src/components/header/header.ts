document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const headerHeight: number = header.offsetHeight
  const menu: HTMLElement = body.querySelector('.menu')

  header.addEventListener('mouseenter', () => {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      header.classList.add('hovered')
    }
  })
  header.addEventListener('mouseleave', () => {
    if (window.matchMedia('(min-width: 1280px)').matches && !menu.matches('.active')) {
      header.classList.remove('hovered')
    }
  })

  window.addEventListener('scroll', () => {
    const { scrollY, } = window

    if (scrollY > headerHeight) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  })
})
