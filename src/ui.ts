import type { ModelEntry } from './catalog'

export function createModelMenu(
  container: HTMLElement,
  entries: ModelEntry[],
  onSelect: (entry: ModelEntry) => void,
) {
  const menu = document.createElement('div')
  menu.className = 'model-menu'

  const categories = [...new Set(entries.map((entry) => entry.category))]

  for (const category of categories) {
    const section = document.createElement('div')
    section.className = 'model-menu-section'

    const heading = document.createElement('h3')
    heading.textContent = category
    section.appendChild(heading)

    const list = document.createElement('ul')
    for (const entry of entries.filter((e) => e.category === category)) {
      const item = document.createElement('li')
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = entry.label
      button.addEventListener('click', () => {
        for (const el of menu.querySelectorAll('button')) {
          el.classList.remove('active')
        }
        button.classList.add('active')
        onSelect(entry)
      })
      item.appendChild(button)
      list.appendChild(item)
    }
    section.appendChild(list)
    menu.appendChild(section)
  }

  container.appendChild(menu)
  return menu
}
