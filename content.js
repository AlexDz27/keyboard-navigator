console.log(12312312312)

let searchInput = ''
document.addEventListener('keyup', (evt) => {
  /* Populate search input */
  // Negate the following keys: 'Ctrl', 'Shift', 'Tab', 'Alt', 'Escape', all arrow keys (up, down, left, right)
  if (evt.key === 'Control' || evt.key === 'Shift' || evt.key === 'Tab'
    || evt.key === 'Alt' || evt.key === 'Escape' || evt.key.includes('Arrow')) return

  // On hitting Ctrl + i, clear the whole search input
  if (evt.ctrlKey && evt.key === 'i') {
    searchInput = ''
    return
  }

  searchInput += evt.key
  console.log(searchInput)

  /* Find links/buttons in viewport */
  let links = document.querySelectorAll('a')
  links = Array.from(links).filter(link => link.innerText.toLowerCase().includes(searchInput))
  links = links.filter(link => isInViewport(link))

  if (links.length === 1) {
    links[0].focus()
  }

  console.log(links)
})


/* Functions */
function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect()

  return bounding.bottom >= 0 && bounding.top <= window.innerHeight
}