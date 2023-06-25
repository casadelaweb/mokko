import { modals } from 'src/scripts/modals-instance'
import { modalsAside } from 'src/modules/modals/modals.aside'

document.addEventListener('DOMContentLoaded', () => {
  modalsAside(modals, '[data-modal=menu]')
})

