let searchInput = ''

let clickables
let idx = 0

document.body.insertAdjacentHTML('beforeend', `<section id="knSearchInput" style="
position: fixed; background-color: yellow; top: 155px; right: 30px; font-size: 23px;"></section>`)
const knSearchInput = document.querySelector('#knSearchInput')

document.addEventListener('keyup', (evt) => {
  /* Populate search input */
  // Negate the following keys: 'Ctrl', 'Shift', 'Tab', 'Alt', 'Escape', 'Enter', 'Backspace',
  // all arrow keys (up, down, left, right), all page keys
  // '[', ']', '/' keys that act as command keys
  if (evt.key === 'Control' || evt.key === 'Shift' || evt.key === 'Tab'
    || evt.key === 'Alt' || evt.key === 'Escape' || evt.key === 'Enter'
    || evt.key.includes('Arrow') || evt.key.includes('Page') || evt.key === '[' || evt.key === ']' || evt.key === '/') return

  if (evt.ctrlKey && evt.key === '.') return

  if (evt.key === 'Backspace') {
    searchInput = searchInput.substring(0, searchInput.length - 1)
    knSearchInput.innerText = searchInput
    return
  }

  searchInput += evt.key
  knSearchInput.innerText = searchInput
  idx = 0
  // console.log(searchInput)

  /* Find links/buttons in viewport */
  let clickablesLinks = Array.from(document.querySelectorAll('a'))
  let clickablesButtons = Array.from(document.querySelectorAll('button'))
  clickables = clickablesLinks.concat(clickablesButtons)
  clickables = clickables.filter(clickable => isInViewport(clickable))
  clickables = clickables.filter(clickable => clickable.innerText.toLowerCase().includes(searchInput.toLowerCase()))

  console.log(clickables)
})

document.addEventListener('keyup', (evt) => {
  if (evt.ctrlKey && (evt.key === '/' || evt.key === '.')) {
    clickables[idx].focus()
  }

  if (evt.key === '[') {
    idx--
    if (idx < 0) idx = clickables.length - 1

    clickables[idx].focus()
  }

  if (evt.key === ']') {
    idx++
    if (idx > clickables.length - 1) idx = 0

    clickables[idx].focus()
  }
})

document.addEventListener('keyup', (evt) => {
  // On hitting Escape, clear the whole search input
  if (evt.key === 'Escape') {
    searchInput = ''
    idx = 0
    knSearchInput.innerText = searchInput
  }
})

// Override 'Space' to be able to write space character inside search input
document.addEventListener('keydown', (evt) => {
  if (document.activeElement instanceof HTMLInputElement) return

  if (evt.key === ' ') evt.preventDefault()
})


/* Functions */
function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect()

  return bounding.bottom >= 0 && bounding.top <= window.innerHeight
}