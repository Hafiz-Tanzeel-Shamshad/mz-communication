import { motion } from "framer-motion"
import { useProducts } from "../../context/ProductContext"
import { getBrandsByCategory } from "../../data/products"

export default function AdminDashboard() {
  const { products } = useProducts()
  const categories = [
    { name: "iPhone", count: products.filter((p) => p.category === "iphone").length },
    { name: "Android", count: products.filter((p) => p.category === "android").length },
  ]
  const totalBrands = getBrandsByCategory().length
  const recentProducts = [...products].slice(0, 5)

  const stats = [
    { label: "Total Products", value: products.length, color: "from-primary to-blue-600" },
    { label: "Total Brands", value: totalBrands, color: "from-accent to-cyan-600" },
    { label: "iPhone Models", value: categories[0].count, color: "from-violet-500 to-purple-600" },
    { label: "Android Models", value: categories[1].count, color: "from-success to-emerald-600" },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-main)" }}>Dashboard</h1>
        <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>Overview of your mobile store</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="card p-5"
            >
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <span className="text-white font-bold">{stat.value}</span>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-main)" }}>Recently Added Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ color: "var(--text-secondary)" }}>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Brand</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: "var(--border-color)" }}>
                    <td className="py-3 font-medium" style={{ color: "var(--text-main)" }}>{p.name}</td>
                    <td className="py-3" style={{ color: "var(--text-secondary)" }}>{p.brand}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${p.category === "iphone" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3" style={{ color: "var(--text-main)" }}>Rs. {p.price.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${p.stock ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                        {p.stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
