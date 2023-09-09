import IMask from 'imask'

export class Masks {
  private elements: HTMLElement[]
  private patterns: {
    tel: string,
    email: RegExp
  }
  private regExps: { email: RegExp }
  private selectors: {
    tel: string,
    email: string,
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
    this.regExps = { email: new RegExp(/^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]?([a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]?)*[a-zA-Z0-9]@[a-zA-Z0-9][-.]?([a-zA-Z][-.]?)*[a-zA-Z0-9]\.[a-zA-Z0-9]+([.-]?[a-zA-Z])*[a-zA-Z0-9]*$/i), }
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

    this.listen()
  }

  private createWarning(): HTMLElement {
    const warning = document.createElement('div')
    warning.textContent = 'Это поле заполнено не корректно'
    return warning
  }

  private listen(): void {
    this.elements.forEach((element: HTMLInputElement | HTMLTextAreaElement) => {
      element.addEventListener('input', () => {
        if (element.matches(this.selectors.tel)) this.validateTel(element)
        if (element.matches(this.selectors.email)) this.validateEmail(element)
      })
    })
    // document.addEventListener('click', (event: MouseEvent) => {
    //   const target = event.target as HTMLElement
    //
    //   if (target.closest('[type=submit]')) {
    //     event.preventDefault()
    //   }
    // })
  }

  private validateEmail(element: HTMLInputElement | HTMLTextAreaElement): void {
    if (!this.regExps.email.test(element.value)) {
      element.classList.add('error')
      element.classList.remove('success')
    } else {
      element.classList.remove('error')
      element.classList.add('success')
    }
  }

  private validateTel(element: HTMLInputElement | HTMLTextAreaElement): void {
    // длина с учетом маски IMask
    if (element.value.length !== 18) {
      element.classList.add('error')
      element.classList.remove('success')
    } else {
      element.classList.remove('error')
      element.classList.add('success')
    }
  }
}
