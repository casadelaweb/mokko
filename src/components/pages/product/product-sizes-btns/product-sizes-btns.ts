import toggle from 'src/modules/toggle/toggle'

document.addEventListener('DOMContentLoaded', () => {
  // toggle('.product-info-block-btn')
  const { body, } = document
  // const sizeBtnsItems: HTMLElement[] = Array.from(body.querySelectorAll('.product-sizes-item'))
  const catalogDetail: HTMLElement = body.querySelector('.product')
  const sizeBtn: HTMLElement = body.querySelector('.product-btn-size')
  const catalogDetailSizesInfo: HTMLElement = body.querySelector('.product-sizes-info')
  const catalogDetailBtns: HTMLElement = body.querySelector('.product-btns')
  const regularPrice: HTMLElement = body.querySelector('.product-price-regular')
  const catalogDetailBtnsPrice: HTMLElement = body.querySelector('.product-btns-price')
  const activeClass: string = 'product-sizes-item-active'
  
  if(catalogDetailBtnsPrice && regularPrice) {
    catalogDetailBtnsPrice.textContent = regularPrice.textContent
  }
  if(catalogDetail) {
    catalogDetail.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      
      if(target.closest('.product-sizes-item')) {
        const button = target.closest('.product-sizes-item')
        const buttons: HTMLElement[] = Array.from(body.querySelectorAll('.product-sizes-item'))
        
        buttons.forEach((element: HTMLElement) => element.classList.remove(activeClass))
        button.classList.add(activeClass)
        
        const textArr: string[] = button.textContent.trim().split(' ')
        sizeBtn.children[0].textContent = `${textArr[0]} (${textArr[1]})`
      }
    })
  }
  
  if(catalogDetailSizesInfo) {
    const catalogDetailSizesInfoMob: HTMLElement = catalogDetailSizesInfo.cloneNode()
    catalogDetailSizesInfoMob.classList.add('product-sizes-info-mob')
    catalogDetailSizesInfoMob.innerHTML = catalogDetailSizesInfo.innerHTML
    
    catalogDetailBtns.insertAdjacentHTML('beforebegin', catalogDetailSizesInfoMob.outerHTML)
  }
  
  toggle('.product-btn-size')
  
  // document.addEventListener('DOMContentLoaded', (event: MouseEvent) => {
  //   const target = event.target as HTMLElement
  //   if (target.closest('.product-btn-buy')) {
  //
  //   }
  // })
})
