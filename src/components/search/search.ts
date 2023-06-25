import { modals } from 'src/scripts/modals-instance'
import { modalsAside } from 'src/modules/modals/modals.aside'

document.addEventListener('DOMContentLoaded', () => {
  modalsAside(modals, '[data-modal=search]')

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.closest('[data-search=reset]')) {
      const { body, } = document
      const form: HTMLFormElement = body.querySelector('[data-search=form]')
      form.reset()
    }
  })
})

