import './toggle.scss'

export default function toggle(selector: string) {
  const { body, } = document
  const allToggles: HTMLElement[] = Array.from(body.querySelectorAll(selector))

  if (allToggles.length) {
    allToggles.forEach(toggleBtn => {
      console.log(toggleBtn)
      const content: HTMLElement = document.getElementById(toggleBtn.dataset.toggleHref)
      content.innerHTML = '<div>' + content.innerHTML + '</div>'
      content.classList.add('krel-toggle-content')
      toggleBtn.classList.add('krel-toggle-btn')
      toggleBtn.addEventListener('click', () => {
        if (toggleBtn.classList.contains('krel-toggle-active')) {
          toggleBtn.classList.remove('krel-toggle-active')
          content.style.height = null
          content.style.opacity = null
        } else {
          toggleBtn.classList.add('krel-toggle-active')
          content.style.height = content.children[0].offsetHeight + 'px'
          content.style.opacity = '1'
        }
      })
    })
  }
}
