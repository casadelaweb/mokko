import { modalsAside } from 'src/modules/modals/modals.aside'
import { modals } from 'src/scripts/modals-instance'

document.addEventListener('DOMContentLoaded', () => {
  modalsAside(modals, '[data-modal=sizeguide]')
})
