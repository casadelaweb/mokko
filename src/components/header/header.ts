document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const header: HTMLElement = body.querySelector('.header')
  const headerHeight: number = header.offsetHeight
  const menu: HTMLElement = body.querySelector('.menu')

  header.addEventListener('mouseenter', () => {
    header.classList.add('hovered')
  })
  header.addEventListener('mouseleave', () => {
    if (!menu.matches('.active')) {
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
