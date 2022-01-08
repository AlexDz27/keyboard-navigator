let idx = 0
let links
let searchInput = ''
document.addEventListener('keyup', (evt) => {
  /* Populate search input */
  // Negate the following keys: 'Ctrl', 'Shift', 'Tab', 'Alt', 'Escape', 'Enter', all arrow keys (up, down, left, right)
  if (evt.key === 'Control' || evt.key === 'Shift' || evt.key === 'Tab'
    || evt.key === 'Alt' || evt.key === 'Escape' || evt.key === 'Enter'
    || evt.key === ']' || evt.key.includes('Arrow')) return

  // On hitting Ctrl + i, clear the whole search input
  if (evt.ctrlKey && evt.key === 'i') {
    searchInput = ''
    return
  }

  searchInput += evt.key
  idx = 0
  console.log(searchInput)

  /* Find links/buttons in viewport and highlight them */
  links = document.querySelectorAll('a')
  links = Array.from(links).filter(link => link.innerText.toLowerCase().includes(searchInput))
  links = links.filter(link => isInViewport(link))

  console.log(links)
})

document.addEventListener('keyup', (evt) => {
  if (evt.key === ']') {
    links[idx].focus()

    idx++
    if (idx > links.length - 1) idx = 0
  }
})


/* Functions */
function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect()

  return bounding.bottom >= 0 && bounding.top <= window.innerHeight
}