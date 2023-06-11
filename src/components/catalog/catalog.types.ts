export interface card {
  card: HTMLElement,
  slider: HTMLElement,
  controls: HTMLElement,
  buttons: {
    prev: HTMLElement,
    next: HTMLElement
  }
}

export interface catalogElements {
  header: HTMLElement,
  layout: HTMLElement,
  catalogHeaderDesktop: HTMLElement,
  cards: card[]
}

export interface selectors {
  slider: string,
  controls: string,
  card: string,
  buttons: {
    prev: string,
    next: string,
  },
}
