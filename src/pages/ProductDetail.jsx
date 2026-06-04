import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getProductById } from "../data/products"
import { useProducts } from "../context/ProductContext"
import ImageGallery from "../components/ImageGallery"
import BuyNowModal from "../components/BuyNowModal"
import { formatPrice } from "../utils/helpers"

export default function ProductDetail() {
  const { id } = useParams()
  const { products } = useProducts()
  const product = products.find((p) => p.id === id) || getProductById(id)
  const [buyOpen, setBuyOpen] = useState(false)
  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions?.[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "")

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text-main)" }}>Product Not Found</h1>
        <Link to="/" className="text-primary hover:underline">Go back home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-4 sm:mb-6 text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to={product.category === "iphone" ? `/${product.category}/${product.brandSlug}` : `/${product.category}`} className="hover:text-primary">
            {product.category === "iphone" ? "iPhone" : "Android"}
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/${product.category}/${product.brandSlug}`} className="hover:text-primary">
            {product.brand}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium" style={{ color: "var(--text-main)" }}>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div>
            <ImageGallery images={product.images} name={product.name} />
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full inline-block">
                  {product.brand}
                </span>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-2" style={{ color: "var(--text-main)" }}>
                  {product.name}
                </h1>
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 shrink-0 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-lg">
                  <span className="text-yellow-400 text-sm">{"★".repeat(Math.round(product.rating))}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    {product.rating}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base line-through" style={{ color: "var(--text-secondary)" }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-white bg-danger px-2.5 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {product.description}
            </p>

            {product.storageOptions?.length > 0 && (
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Storage</label>
                <div className="flex flex-wrap gap-2">
                  {product.storageOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedStorage === s
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
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
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
                        selectedColor === c.name
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                      }`}
                      style={{ color: selectedColor === c.name ? "white" : "var(--text-main)" }}
                    >
                      <span className="inline-block w-3 h-3 rounded-full" style={{ background: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setBuyOpen(true)}
              disabled={!product.stock}
              className="w-full btn-primary text-center py-3.5 text-sm font-bold flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {product.stock ? "Buy via WhatsApp" : "Out of Stock"}
            </button>

            <div>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Specifications
              </h3>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700/50 overflow-hidden">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2.5 px-4"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{key}</span>
                    <span className="text-xs text-right max-w-[55%]" style={{ color: "var(--text-main)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <BuyNowModal product={product} open={buyOpen} onClose={() => setBuyOpen(false)} />
    </div>
  )
}
