import { CatalogCards } from './catalog.cards'
import { isMediaAboveLaptop } from 'src/scripts/helpers'
import './catalog.filters'
import { Details } from 'src/modules/details/details'
import { Select } from 'src/modules/select/select'

document.addEventListener('DOMContentLoaded', () => {
  const catalog = new CatalogCards()
  catalog.init()

  const catalogHeader: HTMLElement = catalog.elements.catalogHeaderDesktop
  if (catalogHeader) {
    window.addEventListener('scroll', () => {
      const { scrollY, } = window

      if (scrollY > catalog.elements.header.offsetHeight) {
        catalogHeader.classList.add('scrolled')
      } else {
        catalogHeader.classList.remove('scrolled')
      }
    })
    if (isMediaAboveLaptop()) {
      catalogHeader.style.overflow = 'unset'
      catalogHeader.style.top = catalog.elements.header.offsetHeight + 'px'
    }
  }

  new Details({
    preferButtonIfExist: true,
    selectors: {
      details: '.catalog-filter',
      summary: '.catalog-filter-summary',
      button: '.catalog-filter-button',
      content: '.catalog-filter-body',
      scrollbars: { vertical: 'has-vertical-scrollbar', },
    },
    onlyUnderLaptop: true,
  }).init()
  new Select({
    selectors: {
      select: '.catalog-filter',
      current: '.catalog-filter-summary',
      value: '.catalog-filter-selected',
      button: '.catalog-filter-button',
      options: '.catalog-filter-body',
      option: '.catalog-filter-label',
    },
  }).init()
})
