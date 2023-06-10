import './select.scss'
import { selectors } from 'src/modules/select/select.types'

export class Select {
  private selectors: selectors

  constructor() {
    this.selectors = {
      select: '.select',
      current: '.select-current',
      button: '.select-button',
      options: '.select-options',
      option: '.select-option',
    }
  }

  public init(): void {
    this.listen()
  }

  private listen(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement

      if (target.closest(this.selectors.current)) {
        const select: HTMLElement = target.closest(this.selectors.select)
        const options: HTMLElement = select.querySelector(this.selectors.options)
        const button: HTMLElement = select.querySelector(this.selectors.button)
        options.classList.toggle('active')
        button.classList.toggle('active')
      }
    })
  }
}
