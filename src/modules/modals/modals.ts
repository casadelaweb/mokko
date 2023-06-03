import 'src/modules/modals/modals.scss'
import { Hooks, Options, Parameters } from 'src/modules/modals/modals.types'
import { throwEvent } from 'src/scripts/helpers.ts'

class Modals {
  private static readonly events = {
    beforeOpen: 'modalBeforeOpen',
    open: 'modalOpen',
    beforeClose: 'modalBeforeClose',
    close: 'modalClose',
  }
  public parameters: Parameters
  public options: Options
  private readonly hooks: Hooks
  private readonly onOpen: any
  private readonly onClose: any
  private readonly onBeforeOpen: any
  private readonly onBeforeClose: any

  constructor({ hooks, }) {
    this.options = {
      selectors: {
        modal: '[data-modal]',
        buttonOpen: '[data-modal-open]',
        buttonClose: '[data-modal-close]',
        buttonToggle: '[data-modal-toggle]',
        header: '[data-header]',
      },
      transition: {
        duration: 333,
        style: () => {
          return 'all ' + this.options.transition.duration + 'ms'
        },
      },
    }
    this.hooks = {
      beforeOpen() {
      },
      open() {
      },
      beforeClose() {
      },
      close() {
      },
      ...hooks,
    }

    this.onOpen = this.hooks.open.bind(this)
    this.onClose = this.hooks.close.bind(this)
    this.onBeforeOpen = this.hooks.beforeOpen.bind(this)
    this.onBeforeClose = this.hooks.beforeClose.bind(this)

    this.parameters = {
      counter: 0,
      all: [],
      current: false,
    }
  }

  public update(): void {
    const { documentElement: html, } = document
    html.style.setProperty('--modal-transition', this.options.transition.style())
  }

  public activateModal(modal: any, trigger?: any): void {
    throwEvent(modal, Modals.events.beforeOpen, { trigger: trigger, })
    this.onBeforeOpen()

    modal.classList.add('active')
    this.parameters.all.push(modal)
    this.parameters.current = modal
    this.parameters.counter++

    this.onOpen()

    throwEvent(modal, Modals.events.open, { trigger: trigger, })
  }

  public deactivateModal(modal: any, trigger?: any): void {
    throwEvent(modal, Modals.events.beforeClose, { trigger: trigger, })
    this.onBeforeClose()

    modal.classList.remove('active')

    new Promise((resolve) => {

      setTimeout(() => {
        this.parameters.all = this.parameters.all.slice(0, -1)
        const lastModal = this.parameters.all[this.parameters.all.length - 1]
        this.parameters.current = lastModal ? lastModal : false
        this.parameters.counter--

        resolve()
      }, this.options.transition.duration)

    }).then(() => {
      this.onClose()
      return throwEvent(modal, Modals.events.close, { trigger: trigger, })
    })
  }

  public toggleModal(modal: any, trigger?: any): void {
    if (this.parameters.counter > 0) {
      this.deactivateModal(modal, trigger)
    } else {
      this.activateModal(modal, trigger)
    }
  }

  public init(): void {
    this.update()

    const { body, } = document
    const { selectors, } = this.options

    const activeModals = body.querySelectorAll(selectors.modal + '.active')
    if (activeModals.length > 0) {
      activeModals.forEach((modal: HTMLElement) => {
        this.activateModal(modal)
      })
    }

    this.listen()
  }

  private listen(): void {
    const { body, } = document
    const { selectors, } = this.options

    document.addEventListener('click', (event: MouseEvent) => {
      const { target, }: { target: HTMLElement } = event
      const conditions = {
        buttonOpen: target.closest(selectors.buttonOpen),
        buttonClose: target.closest(selectors.buttonClose),
        buttonToggle: target.closest(selectors.buttonToggle),
      }

      if (conditions.buttonOpen) {
        const { buttonOpen: button, } = conditions
        const attribute = selectors.buttonOpen.slice(1, -1)
        const modal = body.querySelector('[data-modal=' + button.getAttribute(attribute) + ']')
        if (modal) this.activateModal(modal, button)
      }
      if (conditions.buttonClose) {
        const { buttonClose: button, } = conditions
        let modal: HTMLElement

        if (button.getAttribute(selectors.buttonClose)) {
          const attribute = selectors.buttonClose.slice(1, -1)
          modal = body.querySelector('[data-modal=' + button.getAttribute(attribute) + ']')
        } else {
          modal = button.closest(selectors.modal)
        }

        if (modal) this.deactivateModal(modal, button)
      }
      if (conditions.buttonToggle) {
        const { buttonToggle: button, } = conditions
        const attribute = selectors.buttonToggle.slice(1, -1)
        const modal = body.querySelector('[data-modal=' + button.getAttribute(attribute) + ']')
        if (modal) this.toggleModal(modal, button)
      }
    })
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.code === 'Escape' && this.parameters.counter > 0) {
        this.deactivateModal(this.parameters.current, {
          type: 'keyup',
          key: 'Escape',
          element: false,
          boundedWith: body.querySelector('[data-modal-open]'),
        })
      }
    })
  }
}

export default Modals
