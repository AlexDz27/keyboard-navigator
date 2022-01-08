let searchInput = ''

let links
let idx = 0

document.body.insertAdjacentHTML('beforeend', `<section id="knSearchInput" style="
position: fixed; background-color: yellow; top: 155px; right: 30px; font-size: 23px;"></section>`)
const knSearchInput = document.querySelector('#knSearchInput')

document.addEventListener('keyup', (evt) => {
  /* Populate search input */
  // Negate the following keys: 'Ctrl', 'Shift', 'Tab', 'Alt', 'Escape', 'Enter', 'Backspace',
  // all arrow keys (up, down, left, right), all page keys
  // '[', ']', ',' keys that act as command keys
  if (evt.key === 'Control' || evt.key === 'Shift' || evt.key === 'Tab'
    || evt.key === 'Alt' || evt.key === 'Escape' || evt.key === 'Enter'
    || evt.key.includes('Arrow') || evt.key.includes('Page') || evt.key === '[' || evt.key === ']' || evt.key === ',') return

  if (evt.key === 'Backspace') {
    searchInput = searchInput.substring(0, searchInput.length - 1)
    knSearchInput.innerText = searchInput
    return
  }

  searchInput += evt.key
  knSearchInput.innerText = searchInput
  idx = 0
  console.log(searchInput)

  /* Find links/buttons in viewport */
  links = document.querySelectorAll('a')
  links = Array.from(links).filter(link => link.innerText.toLowerCase().includes(searchInput))
  links = links.filter(link => isInViewport(link))

  console.log(links)
})

document.addEventListener('keyup', (evt) => {
  if (evt.ctrlKey && evt.key === ',') {
    links[idx].focus()
  }

  if (evt.key === '[') {
    idx--
    if (idx < 0) idx = links.length - 1

    links[idx].focus()
  }

  if (evt.key === ']') {
    idx++
    if (idx > links.length - 1) idx = 0

    links[idx].focus()
  }
})

document.addEventListener('keyup', (evt) => {
  // On hitting Ctrl + i, clear the whole search input
  if (evt.ctrlKey && evt.key === 'i') {
    searchInput = ''
    knSearchInput.innerText = searchInput
  }
})

document.addEventListener('keydown', (evt) => {
  if (evt.key === ' ') evt.preventDefault()
})


/* Functions */
function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect()

  return bounding.bottom >= 0 && bounding.top <= window.innerHeight
}