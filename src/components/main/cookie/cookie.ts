document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.closest('[data-cookie=accept]')) {
      const button: HTMLElement = target.closest('[data-cookie=accept]')
      const cookie: HTMLElement = button.closest('[data-cookie=window]')

      cookie.classList.remove('active')
    }
  })
})
