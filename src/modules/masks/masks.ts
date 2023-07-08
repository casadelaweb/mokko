import IMask from 'imask'

export class Masks {
  private elements: HTMLElement[]
  private selectors: {
    tel: string,
    email: string,
  }
  private patterns: {
    tel: string,
    email: RegExp
  }

  constructor() {
    this.elements = []
    this.selectors = {
      tel: '[data-mask=tel]',
      email: '[data-mask=email]',
    }
    this.patterns = {
      tel: '+7 (000) 000-00-00',
      email: /^\S*@?\S*$/,
    }
  }

  public init(): void {
    const { body, } = document

    this.elements = [
      ...body.querySelectorAll(this.selectors.tel),
      ...body.querySelectorAll(this.selectors.email),
    ]
    this.elements.forEach((element: HTMLElement) => {
      if (element.matches(this.selectors.tel)) {
        IMask(element, { mask: this.patterns.tel, })
      }
      if (element.matches(this.selectors.email)) {
        IMask(element, { mask: this.patterns.email, })
      }
    })

    // this.listen()
  }

  // private listen(): void {
  //   document.addEventListener('click', (event: MouseEvent) => {
  //     const target = event.target as HTMLElement
  //
  //     if (target.closest('[type=submit]')) {
  //       event.preventDefault()
  //     }
  //   })
  // }
}
