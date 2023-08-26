document.addEventListener('DOMContentLoaded', () => {
  const {body,} = document

  if (body.querySelector('.info-nav')) {
    let isInfoNavActive = false
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (target.closest('.info-nav-header')) {
        const header = target.closest('.info-nav-header')
        const nav = header.closest('.info-nav')
        const button = nav.querySelector('.info-nav-button')
        const list = nav.querySelector('.info-nav-list')
        nav.classList.toggle('active')
        list.classList.toggle('active')
        button.classList.toggle('active')

        isInfoNavActive = !isInfoNavActive
      } else if (isInfoNavActive && !target.closest('.info-nav')) {
        const nav = body.querySelector('.info-nav')
        // const header = nav.querySelector('.info-nav-header')
        const button = nav.querySelector('.info-nav-button')
        const list = nav.querySelector('.info-nav-list')

        nav.classList.remove('active')
        list.classList.toggle('active')
        button.classList.toggle('active')
      }
    })
  }
})
