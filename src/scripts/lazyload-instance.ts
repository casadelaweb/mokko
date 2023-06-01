import LazyLoad from 'vanilla-lazyload'
import 'src/assets/img/placeholder-error.jpg'

const lazyloadInstance = new LazyLoad({
  elements_selector: '.lazy',
  threshold: 300 * 3,
  callback_error: (img) => {
    img.setAttribute('src', '/assets/img/placeholder-error.jpg')
  },
})

export default lazyloadInstance
