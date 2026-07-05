import { categories, type ModelEntry } from './catalog'

export function createModelMenu(
  container: HTMLElement,
  entries: ModelEntry[],
  onSelectionChange: (selected: ModelEntry[]) => void,
) {
  const menu = document.createElement('div')
  menu.className = 'model-menu'

  const header = document.createElement('div')
  header.className = 'model-menu-header'

  const title = document.createElement('span')
  title.textContent = 'Models'
  header.appendChild(title)

  const toggleButton = document.createElement('button')
  toggleButton.type = 'button'
  toggleButton.className = 'model-menu-toggle'
  toggleButton.textContent = '−'
  toggleButton.setAttribute('aria-label', 'Minimize menu')
  header.addEventListener('click', () => {
    const minimized = menu.classList.toggle('minimized')
    toggleButton.textContent = minimized ? '+' : '−'
    toggleButton.setAttribute('aria-label', minimized ? 'Expand menu' : 'Minimize menu')
  })
  header.appendChild(toggleButton)

  menu.appendChild(header)

  const content = document.createElement('div')
  content.className = 'model-menu-content'

  const hint = document.createElement('p')
  hint.className = 'model-menu-hint'
  hint.textContent = 'Click to add or remove from view'
  content.appendChild(hint)

  const selected = new Set<string>()
  const buttons = new Map<string, HTMLButtonElement>()

  function applySelection() {
    for (const [id, button] of buttons) {
      button.classList.toggle('active', selected.has(id))
    }
    onSelectionChange(entries.filter((entry) => selected.has(entry.id)))
  }

  function handleClick(entry: ModelEntry) {
    if (selected.has(entry.id)) {
      selected.delete(entry.id)
    } else {
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
      button.addEventListener('click', () => handleClick(entry))

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

    content.appendChild(section)
  }

  menu.appendChild(content)
  container.appendChild(menu)

  if (entries.length > 0) {
    selected.add(entries[0].id)
    applySelection()
  }

  return menu
}

export function createControlsHint(container: HTMLElement, onReset: () => void) {
  const isTouch = window.matchMedia('(pointer: coarse)').matches

  const hint = document.createElement('div')
  hint.className = 'controls-hint'

  const lines = isTouch
    ? ['Drag: rotate', 'Pinch: zoom', 'Two-finger drag: move view']
    : [
        'Drag: rotate',
        'Scroll: zoom',
        'Left + right drag: move view',
        'Arrow keys: move view',
        'Space + up/down arrow: move closer/further',
      ]
  for (const line of lines) {
    const p = document.createElement('p')
    p.textContent = line
    hint.appendChild(p)
  }

  const resetButton = document.createElement('button')
  resetButton.type = 'button'
  resetButton.className = 'controls-hint-reset'
  resetButton.textContent = 'Reset view'
  resetButton.addEventListener('click', onReset)
  hint.appendChild(resetButton)

  container.appendChild(hint)
  return hint
}
