document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement

  if (target.closest('.details-button')) {
    const button = target.closest('.details-button')
    const list = button.closest('.details')
    const listBody = list.querySelector('.details-body')

    list.classList.toggle('active')
    listBody.classList.toggle('active')
  }
})
