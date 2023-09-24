interface iElements {
  form: HTMLElement,
  title: HTMLElement,
  discount: HTMLElement,
  slidesContainer: HTMLElement
  pricesContainer: HTMLElement,
  priceOld: HTMLElement,
  price: HTMLElement,
  colorsContainer: HTMLElement,
  color: HTMLElement,
  sizesContainer: HTMLElement,
  size: HTMLElement,
  submit: HTMLElement,
}

interface iSelectors {
  form: string,
  title: string,
  discount: string,
  slidesContainer: string,
  pricesContainer: string,
  priceOld: string,
  price: string,
  colorsContainer: string,
  color: string,
  sizesContainer: string,
  size: string,
  submit: string,
}

export class CatalogPreview {
  private readonly onClick: (event: MouseEvent) => void
  private elements: iElements | false
  private selectors: iSelectors
  
  constructor() {
    this.onClick = this.handleClick.bind(this)
    this.selectors = {
      form: '[data-preview=form]',
      title: '[data-preview=title]',
      submit: '[data-preview=submit]',
      //@ts-ignore
      sizes: '[data-preview=sizes]',
    }
    
    this.elements = {
      form: undefined,
      //@ts-ignore
      colors: undefined,
      sizes: undefined,
      submit: undefined,
    }
  }
  
  public init(): void {
    this.elements = this.updateElements()
    if(this.elements === false) return
    this.updateListeners()
  }
  
  private updateElements(): iElements | false {
    const body = document.body as HTMLElement
    const form: HTMLElement = body.querySelector('[data-preview=form]')
    
    if(!form) return false
    
    const submit: HTMLElement = form.querySelector(this.selectors.submit)
    
    return {
      color: undefined,
      colorsContainer: undefined,
      discount: undefined,
      price: undefined,
      priceOld: undefined,
      pricesContainer: undefined,
      size: undefined,
      sizesContainer: undefined,
      slidesContainer: undefined,
      title: undefined,
      form,
      submit,
    }
  }
  
  private updateListeners(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }
  
  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement
    
    if(target.closest('[data-modal-open=preview]')) {
      const card: HTMLElement = target.closest('[data-catalog=card]')
      if(card.classList.contains('_disabled')) event.preventDefault()
      
    }
    
    //if(target.closest('[data-preview=color]')) {
    //  const button: HTMLElement = target.closest('[data-preview=color]')
    //  this.elements.colors.forEach((element: HTMLElement) => element.classList.remove('active'))
    //  button.classList.add('active')
    //}
    //
    //if(target.closest('[data-preview=size]')) {
    //  const button: HTMLElement = target.closest('[data-preview=size]')
    //  this.elements.sizes.forEach((element: HTMLElement) => element.classList.remove('active'))
    //  button.classList.add('active')
    //}
  }
}
