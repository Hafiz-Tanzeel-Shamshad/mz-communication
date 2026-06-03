import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useProducts } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"

export default function SearchPage() {
  const { products, searchQuery, setSearchQuery } = useProducts()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const filtered = localQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(localQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(localQuery.toLowerCase())
      )
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <Link to="/" className="text-sm hover:text-primary" style={{ color: "var(--text-secondary)" }}>
            Home
          </Link>
          <span className="mx-2 text-sm" style={{ color: "var(--text-secondary)" }}>/</span>
          <span className="text-sm font-medium" style={{ color: "var(--text-main)" }}>Search</span>
        </div>

        <div className="max-w-xl mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: "var(--text-main)" }}>
            Search Products
          </h1>
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value)
              setSearchQuery(e.target.value)
            }}
            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base outline-none transition-all"
            style={{
              background: "var(--bg-main)",
              color: "var(--text-main)",
              border: "1px solid var(--border-color)",
            }}
            autoFocus
          />
        </div>

        {localQuery.trim() && (
          <p className="mb-4 sm:mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            {filtered.length} results for &ldquo;{localQuery}&rdquo;
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : localQuery.trim() ? (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>No products found matching "{localQuery}"</p>
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}
