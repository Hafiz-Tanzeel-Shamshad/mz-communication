const PHONE_NUMBER = "923367555218"

export function generateWhatsAppUrl(productName, name, phone, address, storage, color) {
  const message = encodeURIComponent(
    `I want to buy ${productName}${storage ? ` (${storage})` : ""}${color ? ` - ${color}` : ""}. Name: ${name}, Phone: ${phone}, Address: ${address}`
  )
  return `https://wa.me/${PHONE_NUMBER}?text=${message}`
}
