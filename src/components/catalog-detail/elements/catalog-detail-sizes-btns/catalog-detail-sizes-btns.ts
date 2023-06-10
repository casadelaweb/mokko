import toggle from 'src/modules/toggle/toggle'

document.addEventListener('DOMContentLoaded', () => {
  toggle('.catalog-detail-info-block-btn')
  const {body,} = document
  const sizeBtnsItems: HTMLElement[] = Array.from(body.querySelectorAll('.catalog-detail-sizes-item'))
  const sizeBtn: HTMLElement = body.querySelector('.catalog-detail-btn-size')
  const catalogDetailSizesInfo: HTMLElement = body.querySelector('.catalog-detail-sizes-info')
  const catalogDetailBtns: HTMLElement = body.querySelector('.catalog-detail-btns')
  const activeClass: string = 'catalog-detail-sizes-item-active'


  sizeBtnsItems.forEach((btn: HTMLElement) => {
    console.log(btn)
    btn.addEventListener(('click'), () => {
      sizeBtnsItems.forEach((element: HTMLElement) => {
        element.classList.remove(activeClass)
      })
      btn.classList.add(activeClass)
      const textArr: string[] = btn.textContent.trim().split(' ')
      sizeBtn.children[0].textContent = `${textArr[0]} (${textArr[1]})`
    })
  })

  const catalogDetailSizesInfoMob: HTMLElement = catalogDetailSizesInfo.cloneNode()
  catalogDetailSizesInfoMob.classList.add('catalog-detail-sizes-info-mob')
  catalogDetailSizesInfoMob.innerHTML = catalogDetailSizesInfo.innerHTML

  catalogDetailBtns.insertAdjacentHTML('beforebegin', catalogDetailSizesInfoMob.outerHTML)

})
