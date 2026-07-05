import { categories, type ModelEntry } from './catalog'

export function createModelMenu(
  container: HTMLElement,
  entries: ModelEntry[],
  onSelectionChange: (selected: ModelEntry[]) => void,
) {
  const menu = document.createElement('div')
  menu.className = 'model-menu'

  const hint = document.createElement('p')
  hint.className = 'model-menu-hint'
  hint.textContent = 'Shift+click to select multiple'
  menu.appendChild(hint)

  const selected = new Set<string>()
  const buttons = new Map<string, HTMLButtonElement>()

  function applySelection() {
    for (const [id, button] of buttons) {
      button.classList.toggle('active', selected.has(id))
    }
    onSelectionChange(entries.filter((entry) => selected.has(entry.id)))
  }

  function handleClick(entry: ModelEntry, event: MouseEvent) {
    if (event.shiftKey) {
      if (selected.has(entry.id)) {
        selected.delete(entry.id)
      } else {
        selected.add(entry.id)
      }
    } else {
      selected.clear()
      selected.add(entry.id)
    }
    applySelection()
  }

  function renderList(items: ModelEntry[]) {
    const list = document.createElement('ul')
    for (const entry of items) {
      const item = document.createElement('li')
      const button = document.createElement('button')
      button.type = 'button'
      button.addEventListener('click', (event) => handleClick(entry, event))

      const dot = document.createElement('span')
      dot.className = 'model-menu-dot'
      button.appendChild(dot)

      const label = document.createElement('span')
      label.textContent = entry.label
      button.appendChild(label)

      buttons.set(entry.id, button)
      item.appendChild(button)
      list.appendChild(item)
    }
    return list
  }

  for (const category of categories) {
    const categoryEntries = entries.filter((e) => e.category === category.name)

    const section = document.createElement('div')
    section.className = 'model-menu-section'

    const heading = document.createElement('h3')
    heading.textContent = category.name
    section.appendChild(heading)

    if (category.groups) {
      for (const group of category.groups) {
        const groupEntries = categoryEntries.filter((e) => e.group === group)

        const groupHeading = document.createElement('h4')
        groupHeading.textContent = group
        section.appendChild(groupHeading)

        if (groupEntries.length === 0) {
          const empty = document.createElement('p')
          empty.className = 'model-menu-empty'
          empty.textContent = 'No models yet'
          section.appendChild(empty)
        } else {
          section.appendChild(renderList(groupEntries))
        }
      }
    } else {
      section.appendChild(renderList(categoryEntries))
    }

    menu.appendChild(section)
  }

  container.appendChild(menu)

  if (entries.length > 0) {
    selected.add(entries[0].id)
    applySelection()
  }

  return menu
}
