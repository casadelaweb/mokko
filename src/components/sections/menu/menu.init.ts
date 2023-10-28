import { menu } from 'src/scripts/menu-instance'
import './menu.mobile'

document.addEventListener('DOMContentLoaded', () => {
  menu.init()
}, { passive: true, })
