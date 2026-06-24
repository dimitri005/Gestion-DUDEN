export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF"
  }).format(price)
}

export const truncate = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + "..." : text
}