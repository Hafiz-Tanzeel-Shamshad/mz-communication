import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { formatPrice } from "../utils/helpers"

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="card block overflow-hidden group">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={product.images?.[0] || "https://placehold.co/400x400/e2e8f0/64748b?text=Phone"}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.src = `https://placehold.co/400x400/111827/F8FAFC?text=${encodeURIComponent(product.name)}`; e.target.onerror = null }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-danger text-white text-xs font-bold px-3 py-1 rounded-full">
              -{product.discount}%
            </div>
          )}
          {!product.stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {product.brand}
          </span>
          <h3 className="font-semibold mt-1 mb-2 line-clamp-1" style={{ color: "var(--text-main)" }}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: "var(--text-main)" }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through" style={{ color: "var(--text-secondary)" }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-yellow-400 text-sm">{"★".repeat(Math.round(product.rating))}</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                ({product.rating})
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
