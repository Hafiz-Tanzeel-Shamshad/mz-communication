export function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`
}

export function getDiscountPercentage(original, current) {
  if (!original || original <= current) return 0
  return Math.round(((original - current) / original) * 100)
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text
  return text.substring(0, length) + "..."
}
