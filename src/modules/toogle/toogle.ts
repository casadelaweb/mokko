import './toogle.scss'

export default function toogle(selector: string) {
  const allToogles: NodeList = document.querySelectorAll(selector)

  if (allToogles.length) {
    allToogles.forEach(toogleBtn => {

      console.log(toogleBtn)
      const content: HTMLElement = document.getElementById(toogleBtn.dataset.toogleHref)
      content.innerHTML = '<div>' + content.innerHTML + '</div>'
      content.classList.add('krel-toogle-content')
      toogleBtn.classList.add('krel-toogle-btn')
      toogleBtn.addEventListener('click', () => {
        if (toogleBtn.classList.contains('krel-toogle-active')) {
          toogleBtn.classList.remove('krel-toogle-active')
          content.style.height = null
          content.style.opacity = null
        } else {
          toogleBtn.classList.add('krel-toogle-active')
          content.style.height = content.children[0].offsetHeight + 'px'
          content.style.opacity = '1'
        }
      })


    })
  }
}
