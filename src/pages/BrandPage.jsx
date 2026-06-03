import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useProducts } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"

const brandNames = {
  apple: "Apple",
  samsung: "Samsung",
  "google-pixel": "Google Pixel",
  redmi: "Redmi",
  infinix: "Infinix",
  tecno: "Tecno",
  oneplus: "OnePlus",
}

export default function BrandPage() {
  const { category, brand } = useParams()
  const { getFilteredProducts } = useProducts()
  const products = getFilteredProducts(category, brand)
  const brandName = brandNames[brand] || brand

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/${category}`} className="hover:text-primary">
            {category === "iphone" ? "iPhone" : "Android"}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium" style={{ color: "var(--text-main)" }}>{brandName}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--text-main)" }}>
          {brandName}
        </h1>
        <p className="text-sm sm:text-lg mb-8 sm:mb-10" style={{ color: "var(--text-secondary)" }}>
          {products.length} {products.length === 1 ? "phone" : "phones"} available
        </p>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>No products found in this brand yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
