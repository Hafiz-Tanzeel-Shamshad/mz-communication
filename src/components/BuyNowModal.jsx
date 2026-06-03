import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { generateWhatsAppUrl } from "../utils/whatsapp"
import { formatPrice } from "../utils/helpers"

export default function BuyNowModal({ product, open, onClose }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions?.[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "")
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = "Name is required"
    if (!phone.trim()) errs.phone = "Phone is required"
    else if (!/^(\+92|0|92)?\d{10,12}$/.test(phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid Pakistani phone number"
    if (!address.trim()) errs.address = "Address is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const url = generateWhatsAppUrl(
      product.name,
      name,
      phone,
      address,
      selectedStorage,
      selectedColor
    )
    window.open(url, "_blank")
    setName("")
    setPhone("")
    setAddress("")
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-4 sm:p-6 pb-0 gap-4">
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold" style={{ color: "var(--text-main)" }}>
                  Buy Now
                </h2>
                <p className="text-xs sm:text-sm mt-1 truncate" style={{ color: "var(--text-secondary)" }}>
                  {product.name}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shrink-0"
              >
                <XMarkIcon className="w-5 h-5" style={{ color: "var(--text-main)" }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--bg-main)" }}>
                {product.images?.[0] && (
                  <img src={product.images[0]} alt="" onError={(e) => { e.target.src = "https://placehold.co/64x64/e2e8f0/64748b?text=P" }} className="w-16 h-16 object-cover rounded-lg" />
                )}
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-main)" }}>{product.name}</p>
                  <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                </div>
              </div>

              {product.storageOptions?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-main)" }}>Storage</label>
                  <div className="flex flex-wrap gap-2">
                    {product.storageOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedStorage(s)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          selectedStorage === s
                            ? "bg-primary text-white border-primary"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary"
                        }`}
                        style={{ color: selectedStorage === s ? "white" : "var(--text-main)" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-main)" }}>Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          selectedColor === c.name
                            ? "bg-primary text-white border-primary"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary"
                        }`}
                        style={{ color: selectedColor === c.name ? "white" : "var(--text-main)" }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    border: `1px solid ${errors.name ? "#EF4444" : "var(--border-color)"}`,
                  }}
                />
                {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    border: `1px solid ${errors.phone ? "#EF4444" : "var(--border-color)"}`,
                  }}
                />
                {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Address *</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    border: `1px solid ${errors.address ? "#EF4444" : "var(--border-color)"}`,
                  }}
                />
                {errors.address && <p className="text-xs text-danger mt-1">{errors.address}</p>}
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-center flex items-center justify-center gap-2 py-3.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continue to WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
