function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

function formatString(val: string): string {
  return val
    .split('-')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ')
}

export function getTitleSuffix(
  tag?: string | null,
  category?: string | null,
  author?: string | null,
): string {
  let suffix = ''

  const capTag = tag ? formatString(tag) : null
  const capCategory = category ? formatString(category) : null
  const capAuthor = author ? formatString(author) : null

  if (capTag && capCategory) {
    suffix = `${capTag} & ${capCategory}`
  } else if (capTag) {
    suffix = `Tag: ${capTag}`
  } else if (capCategory) {
    suffix = `Category: ${capCategory}`
  } else if (capAuthor) {
    suffix = `Author: ${capAuthor}`
  }

  return suffix
}
