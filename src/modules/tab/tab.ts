export class Tab {
  // eslint-disable-next-line no-unused-vars
  private readonly onClick: (event) => void
  private readonly selectors: {
    button: string,
    tab: string,
    content: string
  }

  constructor() {
    this.selectors = {
      button: '[data-tab-button]',
      content: '[data-tab-content]',
      tab: '[data-tab]',
    }
    this.onClick = this.handleClick.bind(this)
  }

  public init(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target.closest(this.selectors.button)) {
      const button: HTMLElement = target.closest(this.selectors.button)
    }
  }
}
