import toggle from 'src/modules/toggle/toggle'

document.addEventListener('DOMContentLoaded', () => {
  // toggle('.catalog-detail-info-block-btn')
  const { body, } = document
  // const sizeBtnsItems: HTMLElement[] = Array.from(body.querySelectorAll('.catalog-detail-sizes-item'))
  const catalogDetail: HTMLElement = body.querySelector('.catalog-detail')
  const sizeBtn: HTMLElement = body.querySelector('.catalog-detail-btn-size')
  const catalogDetailSizesInfo: HTMLElement = body.querySelector('.catalog-detail-sizes-info')
  const catalogDetailBtns: HTMLElement = body.querySelector('.catalog-detail-btns')
  const regularPrice: HTMLElement = body.querySelector('.catalog-detail-price-regular')
  const catalogDetailBtnsPrice: HTMLElement = body.querySelector('.catalog-detail-btns-price')
  const activeClass: string = 'catalog-detail-sizes-item-active'

  if (catalogDetailBtnsPrice && regularPrice) {
    catalogDetailBtnsPrice.textContent = regularPrice.textContent
  }
  if (catalogDetail) {
    catalogDetail.addEventListener('click', (event) => {
      const target = event.target as HTMLElement

      if (target.closest('.catalog-detail-sizes-item')) {
        const button = target.closest('.catalog-detail-sizes-item')
        const buttons: HTMLElement[] = Array.from(body.querySelectorAll('.catalog-detail-sizes-item'))

        buttons.forEach((element: HTMLElement) => element.classList.remove(activeClass))
        button.classList.add(activeClass)

        const textArr: string[] = button.textContent.trim().split(' ')
        sizeBtn.children[0].textContent = `${textArr[0]} (${textArr[1]})`
      }
    })
  }

  if (catalogDetailSizesInfo) {
    const catalogDetailSizesInfoMob: HTMLElement = catalogDetailSizesInfo.cloneNode()
    catalogDetailSizesInfoMob.classList.add('catalog-detail-sizes-info-mob')
    catalogDetailSizesInfoMob.innerHTML = catalogDetailSizesInfo.innerHTML

    catalogDetailBtns.insertAdjacentHTML('beforebegin', catalogDetailSizesInfoMob.outerHTML)
  }

  toggle('.catalog-detail-btn-size')

  // document.addEventListener('DOMContentLoaded', (event: MouseEvent) => {
  //   const target = event.target as HTMLElement
  //   if (target.closest('.catalog-detail-btn-buy')) {
  //
  //   }
  // })
})
