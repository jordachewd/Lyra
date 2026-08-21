import type {AccordionItem} from '@/lib/zod/sections/content/accordion'

type GroupedItem = {
  index: number
  item: AccordionItem
}

type GroupedRow = {
  id: string
  letter: string
  items: GroupedItem[]
}

type SortAndGroupResult = {
  sorted: AccordionItem[]
  grouped: GroupedRow[]
}

function normalizeLetter(title: string | null | undefined): string {
  const firstChar = title?.trim()?.[0] ?? ''
  if (!firstChar) return '#'
  const letter = firstChar.toUpperCase()
  return /[A-Z]/.test(letter) ? letter : '#'
}

export function groupAccordionItems(items: AccordionItem[], ordered: boolean): SortAndGroupResult {
  const base = [...items]

  const sorted = ordered
    ? base.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '', undefined, {
          sensitivity: 'base',
        }),
      )
    : base

  const grouped: GroupedRow[] = []
  let currentLetter: string | null = null

  sorted.forEach((item, index) => {
    const letter = normalizeLetter(item.title)
    if (ordered) {
      if (letter !== currentLetter) {
        currentLetter = letter

        grouped.push({
          id: `row-${letter}-${index}`,
          letter,
          items: [],
        })
      }

      const row = grouped.find((r) => r.letter === letter)
      row?.items.push({index, item})
    }
  })

  return {sorted, grouped}
}
