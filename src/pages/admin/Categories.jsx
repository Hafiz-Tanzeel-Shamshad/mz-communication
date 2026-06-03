import { useState } from "react"
import { motion } from "framer-motion"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useProducts } from "../../context/ProductContext"
import { getBrandsByCategory, getCategories } from "../../data/products"

export default function AdminCategories() {
  const { products } = useProducts()
  const categories = getCategories()
  const brands = getBrandsByCategory()

  const [newBrand, setNewBrand] = useState({ name: "", category: "android", slug: "" })
  const [brandsList, setBrandsList] = useState(brands)

  const addBrand = () => {
    if (!newBrand.name.trim()) return
    const slug = newBrand.name.toLowerCase().replace(/\s+/g, "-")
    setBrandsList((prev) => [
      ...prev,
      { ...newBrand, id: slug, slug, image: "" },
    ])
    setNewBrand({ name: "", category: "android", slug: "" })
  }

  const removeBrand = (id) => {
    setBrandsList((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-main)" }}>Categories & Brands</h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>Manage your store categories and brands</p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-main)" }}>Categories</h2>
            <div className="space-y-3">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.id).length
                return (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: "var(--bg-main)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                        cat.id === "iphone" ? "bg-violet-500" : "bg-emerald-500"
                      }`}>
                        {cat.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: "var(--text-main)" }}>{cat.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{count} products</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      cat.id === "iphone" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    }`}>
                      {cat.id}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-main)" }}>Brands</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Brand name"
                value={newBrand.name}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, name: e.target.value }))}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }}
              />
              <select
                value={newBrand.category}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }}
              >
                <option value="android">Android</option>
                <option value="iphone">iPhone</option>
              </select>
              <button onClick={addBrand} className="btn-primary px-4 py-2.5 flex items-center">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {brandsList.map((brand) => {
                const count = products.filter((p) => p.brandSlug === brand.slug).length
                return (
                  <div
                    key={brand.id}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "var(--bg-main)" }}
                  >
                    <div className="flex items-center gap-3">
                      {brand.image && (
                        <img src={brand.image} alt="" onError={(e) => { e.target.src = "https://placehold.co/32x32/e2e8f0/64748b?text=B" }} className="w-8 h-8 object-contain" />
                      )}
                      <div>
                        <p className="font-medium text-sm" style={{ color: "var(--text-main)" }}>{brand.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {count} products · {brand.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeBrand(brand.id)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      <TrashIcon className="w-4 h-4 text-danger" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
