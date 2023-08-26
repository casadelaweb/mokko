import './select.scss'
import { iSelectors } from 'src/modules/select/select.types'

interface iOptions {
  selectors: iSelectors
}

export class Select {
  private static readonly optionsDefault: iOptions = {
    selectors: {
      select: '.select',
      current: '.select-current',
      value: '.select-current-value',
      button: '.select-current-button',
      options: '.select-options',
      option: '.select-option',
    },
  }
  public elements: any[]
  private selectors: iSelectors
  private parameters: {
    current: HTMLElement | HTMLElement[]
  }

  constructor(optionsCustom?: iOptions) {
    this.selectors = {
      ...Select.optionsDefault.selectors,
      ...optionsCustom?.selectors,
    }
    this.parameters = { current: [], }
    this.elements = []
  }

  public init(): void {
    this.listen()
    this.update()
    console.log(this)
  }

  private update(): void {
    const { body, } = document

    const selects: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.select))
    selects.forEach((select: HTMLElement) => {
      const optionsAll = Array.from(select.querySelectorAll(this.selectors.option))
      const optionsActive = optionsAll.filter((option: HTMLElement) => option.classList.contains('active'))

      if (optionsActive.length > 0) {
        const valueContainer = select.querySelector(this.selectors.value)
        let valueContent: string = ''
        optionsActive.forEach((option) => valueContent = valueContent + option.textContent)
        valueContainer.textContent = valueContent
      }

      this.elements.push({
        select,
        current: select.querySelector(this.selectors.current),
        value: select.querySelector(this.selectors.value),
        button: select.querySelector(this.selectors.button),
        options: select.querySelector(this.selectors.options),
        option: select.querySelector(this.selectors.option),
      })
    })
  }

  private deactivate(select: HTMLElement): void {
    const options: HTMLElement = select.querySelector(this.selectors.options)
    const button: HTMLElement = select.querySelector(this.selectors.button)

    select.classList.remove('active')
    options.classList.remove('active')
    button.classList.remove('active')
  }

  private listen(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement

      if (target.closest(this.selectors.current)) {
        const select: HTMLElement = target.closest(this.selectors.select)
        const options: HTMLElement = select.querySelector(this.selectors.options)
        const button: HTMLElement = select.querySelector(this.selectors.button)

        if (this.parameters.current instanceof HTMLElement && this.parameters.current !== select) {
          this.deactivate(this.parameters.current)
        }
        this.parameters.current = select
        select.classList.toggle('active')
        options.classList.toggle('active')
        button.classList.toggle('active')
      }

      if (target.closest(this.selectors.option)) {
        const select: HTMLElement = target.closest(this.selectors.select)
        const optionsAll: HTMLElement[] = Array.from(select.querySelectorAll(this.selectors.option))
        const optionCurrent: HTMLElement = target.closest(this.selectors.option)
        const valueContainer: HTMLElement = select.querySelector(this.selectors.value)

        optionsAll.forEach((option: HTMLElement) => option.classList.remove('active'))
        optionCurrent.classList.add('active')
        valueContainer.textContent = optionCurrent.textContent
      }

      if (!target.closest(this.selectors.select)) {
        if (this.parameters.current instanceof HTMLElement) this.deactivate(this.parameters.current)
      }
    })
  }
}
