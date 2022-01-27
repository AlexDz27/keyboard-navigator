let searchInput = ''

let clickables = []
let idx = 0

document.body.insertAdjacentHTML('beforeend', `<section id="knSearchInput" style="
position: fixed; background-color: yellow; top: 155px; right: 30px; font-size: 23px;"></section>`)
const knSearchInput = document.querySelector('#knSearchInput')

document.addEventListener('keyup', (evt) => {
  /* Populate search input */
  // Negate the following keys: 'Ctrl', 'Shift', 'Tab', 'Alt', 'Escape', 'Enter', 'Audio*', 'Meta',
  // all arrow keys (up, down, left, right), all page keys
  // '[', ']', '/' keys that act as command keys
  if (evt.key === 'Control' || evt.key === 'Shift' || evt.key === 'Tab'
    || evt.key === 'Alt' || evt.key === 'Escape' || evt.key === 'Enter' || evt.key.includes('Audio') || evt.key.includes('Meta')
    || evt.key.includes('Arrow') || evt.key.includes('Page') || evt.key === '[' || evt.key === ']' || evt.key === '/') return

  // If writing inside inputs, don't populate search input
  if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) return
  if (document.activeElement.hasAttribute('contenteditable')) return

  // Negate anything that was typed with Ctrl and Shift keys (accessing browser console, etc)
  if (evt.ctrlKey || evt.shiftKey) return

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

  // console.log(clickables)
})

document.addEventListener('keyup', (evt) => {
  // Second part of the if - make it possible to hit Enter to highlight the clickables
  if (evt.ctrlKey && (evt.key === '/' || evt.key === '.') || evt.key === 'Enter' && clickables.length === 0) {
    clickables.forEach((clickable) => {
      clickable.style.outline = '1px dotted gray'

      clickable.onfocus = () => {
        clickable.style.outline = '1px solid cyan'
      }
    })

    clickables[idx].focus()
  }

  if (evt.key === '[') {
    idx--
    if (idx < 0) idx = clickables.length - 1

    clickables[idx + 1].style.outline = ''

    clickables[idx].focus()
  }

  if (evt.key === ']') {
    idx++
    if (idx > clickables.length - 1) idx = 0

    clickables[idx - 1].style.outline = ''

    clickables[idx].focus()
  }
})

document.addEventListener('keyup', (evt) => {
  // On hitting Escape, clear the whole search input
  if (evt.key === 'Escape') {
    searchInput = ''
    idx = 0
    knSearchInput.innerText = searchInput

    clickables.forEach((clickable) => {
      clickable.style.outline = ''
    })
  }
})

// Override 'Space' to be able to write space character inside search input
document.addEventListener('keydown', (evt) => {
  if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) return
  if (document.activeElement.hasAttribute('contenteditable')) return

  if (evt.key === ' ') evt.preventDefault()
})

// On hitting 'Enter', assume we've got through the clickable - and we should empty the search input
document.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter' && clickables.length > 0) {
    searchInput = ''
    idx = 0
    knSearchInput.innerText = searchInput

    clickables.forEach((clickable) => {
      clickable.style.outline = ''
    })
  }
})


/* Functions */
function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect()

  return bounding.bottom >= 0 && bounding.top <= window.innerHeight
}