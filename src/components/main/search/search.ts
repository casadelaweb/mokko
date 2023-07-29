import { modals } from 'src/scripts/modals-instance'
import { modalsAside } from 'src/modules/modals/modals.aside'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  modalsAside(modals, '[data-modal=search]')

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.closest('[data-search=reset]')) {

      const form: HTMLFormElement = body.querySelector('[data-search=form]')
      form.reset()
    }
  })

  const searchInput: HTMLInputElement = body.querySelector('.search-input')
  const searchResults: HTMLElement = body.querySelector('.search-results')
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      searchResults.classList.add('loading')
      setTimeout(() => {
        searchResults.classList.remove('loading')
      }, 500)
    })
  }
})

