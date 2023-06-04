export interface menuElements {
  overlay: HTMLElement | null,
  header: HTMLElement | null,
  menu: HTMLElement | null,
  buttonsDesktopClose: HTMLElement[] | [],
  buttonDesktopOpen: HTMLElement | null,
  buttonMobileOpen: HTMLElement | null,
  buttonMobileClose: HTMLElement | null,
}

export interface menuSelectors {
  overlay: string,
  header: string,
  menu: string,
  buttonsDesktopClose: string[],
  buttonDesktopOpen: string,
  buttonMobileOpen: string,
  buttonMobileClose: string,
}
