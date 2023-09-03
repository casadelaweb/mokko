export interface iCard {
  buttons: {
    prev: HTMLElement,
    next: HTMLElement
  }
  card: HTMLElement,
  controls: HTMLElement,
  slider: HTMLElement,
}

export interface iCatalogElements {
  cards: iCard[]
  catalogHeaderDesktop: HTMLElement,
  header: HTMLElement,
  layout: HTMLElement,
}

export interface iSelectors {
  buttonCatalogUpdate: string,
  buttons: {
    prev: string,
    next: string,
  },
  card: string,
  catalogLayout: string,
  controls: string,
  slider: string,
}
