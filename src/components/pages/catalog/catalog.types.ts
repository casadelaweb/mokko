export interface iCard {
  card: HTMLElement,
  slider: HTMLElement,
  controls: HTMLElement,
  buttons: {
    prev: HTMLElement,
    next: HTMLElement
  }
}

export interface iCatalogElements {
  header: HTMLElement,
  layout: HTMLElement,
  catalogHeaderDesktop: HTMLElement,
  cards: iCard[]
}

export interface iSelectors {
  slider: string,
  controls: string,
  card: string,
  buttons: {
    prev: string,
    next: string,
  },
}

export interface iHooks {
  // eslint-disable-next-line no-unused-vars
  onDOMMutation?(): any,
  // eslint-disable-next-line no-unused-vars
  afterMouseEnter?(element: iCard): any

  // eslint-disable-next-line no-unused-vars
  afterMouseLeave?(element: iCard): any
}
