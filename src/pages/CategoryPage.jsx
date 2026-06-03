import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getBrandsByCategory } from "../data/products"

export default function CategoryPage() {
  const { category } = useParams()
  const brands = getBrandsByCategory(category)
  const categoryName = category === "iphone" ? "iPhone" : "Android"

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
          <span className="text-sm font-medium" style={{ color: "var(--text-main)" }}>{categoryName}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--text-main)" }}>
          {categoryName}
        </h1>
        <p className="text-sm sm:text-lg mb-8 sm:mb-10" style={{ color: "var(--text-secondary)" }}>
          {category === "android"
            ? "Explore Android phones from the world's top brands"
            : "Discover the latest iPhone models"}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/${category}/${brand.slug}`}
                className="card flex items-center gap-5 p-6 group"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-3">
                  <img src={brand.image} alt={brand.name} onError={(e) => { e.target.src = "https://placehold.co/64x64/e2e8f0/64748b?text=" + brand.name[0] }} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg" style={{ color: "var(--text-main)" }}>
                    {brand.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    Browse {brand.name} phones
                  </p>
                </div>
                <svg className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "var(--text-secondary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
