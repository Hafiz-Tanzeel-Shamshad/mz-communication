import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getCategories, getFeaturedProducts } from "../data/products"
import ProductCard from "../components/ProductCard"
import UrgentOffer from "../components/UrgentOffer"

const categories = getCategories()
const featuredProducts = getFeaturedProducts()

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Premium Smartphones</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight" style={{ color: "var(--text-main)" }}>
                Your Trusted{" "}
                <span className="text-primary">Mobile Store</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Discover the latest iPhones and Android smartphones from top brands. 
                Quality guaranteed, best prices across Pakistan.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
                <Link to="/iphone/apple" className="btn-primary inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  Shop iPhone
                </Link>
                <Link to="/android" className="px-6 py-3 rounded-xl font-semibold transition-all border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Shop Android
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl pointer-events-none" />
                <img
                  src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-2.jpg"
                  alt="iPhone 16 Pro"
                  onError={(e) => { e.target.src = "https://placehold.co/400x400/e2e8f0/64748b?text=iPhone" }}
                  className="relative w-full max-w-md mx-auto object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <UrgentOffer />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "var(--text-main)" }}>
            Shop by Category
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Choose from our premium collection
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/${cat.slug}`}
                className="card flex items-center gap-6 p-6 md:p-8 overflow-hidden relative group"
              >
                <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={cat.image} alt={cat.name} onError={(e) => { e.target.src = "https://placehold.co/200x200/e2e8f0/64748b?text=" + cat.name }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "var(--text-main)" }}>
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {cat.count} Products
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-primary font-semibold text-sm">
                    Browse {cat.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "var(--text-main)" }}>
                Featured Products
              </h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
                Our top picks for you
              </p>
            </div>
            <Link to="/android" className="text-primary font-semibold text-xs sm:text-sm hover:underline shrink-0 whitespace-nowrap">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="card p-6 sm:p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)" }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Why Choose MZ Communication?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
            We provide the best mobile buying experience in Pakistan
          </p>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {[
              { title: "100% Genuine Products", desc: "All phones are brand new, sealed, and officially imported." },
              { title: "Best Price Guarantee", desc: "We match or beat any genuine offer in the market." },
              { title: "Easy WhatsApp Ordering", desc: "Order directly via WhatsApp. Simple, fast, and secure." },
            ].map((item, i) => (
              <div key={i} className="text-white flex md:block items-start gap-4 md:gap-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center mb-0 md:mb-4 shrink-0">
                  <span className="text-base md:text-xl font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
