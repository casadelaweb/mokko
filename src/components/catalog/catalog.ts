import { catalogElements } from 'src/components/catalog/catalog.types'

class Catalog {
  private elements: catalogElements

  public init(): void {
    this.elements = this.updateElements()
    this.listen()
  }

  private listen(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement

      if (target.closest('[data-catalog-layout]')) {
        const button = target.closest('[data-catalog-layout]')
        const mode = button.getAttribute('data-catalog-layout')

        this.changeLayoutMode(mode)
      }
    })
  }

  private changeLayoutMode(mode: string): void {
    switch (mode) {
    case 'row':
      this.elements.layout.classList.add('mode-row')
      break
    default:
      this.elements.layout.classList.remove('mode-row')
      break
    }
  }

  private updateElements(): catalogElements {
    const { body, } = document

    const layout: HTMLElement = body.querySelector('[data-catalog=layout]')
    return { layout, }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const catalog = new Catalog()
  catalog.init()
})
