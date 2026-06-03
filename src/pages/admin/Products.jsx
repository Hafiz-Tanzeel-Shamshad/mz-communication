import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useProducts } from "../../context/ProductContext"
import { formatPrice } from "../../utils/helpers"

const emptyProduct = {
  name: "",
  brand: "Apple",
  brandSlug: "apple",
  category: "iphone",
  price: "",
  originalPrice: "",
  discount: 0,
  description: "",
  specifications: { Display: "", Chip: "", RAM: "", Storage: "", Battery: "", Camera: "", OS: "" },
  storageOptions: [],
  colors: [],
  images: [],
  stock: true,
  featured: false,
  rating: 4,
}

const brandOptions = [
  { name: "Apple", slug: "apple", category: "iphone" },
  { name: "Google Pixel", slug: "google-pixel", category: "android" },
  { name: "Samsung", slug: "samsung", category: "android" },
  { name: "Redmi", slug: "redmi", category: "android" },
  { name: "Infinix", slug: "infinix", category: "android" },
  { name: "Tecno", slug: "tecno", category: "android" },
  { name: "OnePlus", slug: "oneplus", category: "android" },
]

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "all" || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const openAdd = () => {
    setEditing(null)
    setForm(emptyProduct)
    setModal(true)
  }

  const openEdit = (product) => {
    setEditing(product.id)
    setForm({ ...product })
    setModal(true)
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSpecChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }))
  }

  const handleStorageChange = (value) => {
    const arr = value.split(",").map((s) => s.trim()).filter(Boolean)
    setForm((prev) => ({ ...prev, storageOptions: arr }))
  }

  const handleColorsChange = (value) => {
    const arr = value.split(",").map((s) => s.trim()).filter(Boolean)
    setForm((prev) => ({ ...prev, colors: arr.map((c) => ({ name: c, hex: "#CCCCCC" })) }))
  }

  const handleImagesChange = (value) => {
    const arr = value.split("\n").map((s) => s.trim()).filter(Boolean)
    setForm((prev) => ({ ...prev, images: arr }))
  }

  const handleBrandChange = (name) => {
    const brand = brandOptions.find((b) => b.name === name)
    if (brand) {
      setForm((prev) => ({
        ...prev,
        brand: brand.name,
        brandSlug: brand.slug,
        category: brand.category,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productData = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      discount: form.discount || 0,
      stock: form.stock ?? true,
      rating: Number(form.rating) || 4,
    }

    if (editing) {
      updateProduct(editing, productData)
    } else {
      addProduct(productData)
    }
    setModal(false)
    setEditing(null)
    setForm(emptyProduct)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-main)" }}>Products</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              {products.length} total products
            </p>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
            <PlusIcon className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }}
          >
            <option value="all">All Categories</option>
            <option value="iphone">iPhone</option>
            <option value="android">Android</option>
          </select>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Brand</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Featured</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b" style={{ borderColor: "var(--border-color)" }}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] && (
                          <img src={p.images[0]} alt="" onError={(e) => { e.target.src = "https://placehold.co/40x40/e2e8f0/64748b?text=P" }} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <span className="font-medium" style={{ color: "var(--text-main)" }}>{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4" style={{ color: "var(--text-secondary)" }}>{p.brand}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${p.category === "iphone" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-medium" style={{ color: "var(--text-main)" }}>{formatPrice(p.price)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${p.stock ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                        {p.stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4">
                      {p.featured ? (
                        <span className="text-yellow-500">★</span>
                      ) : (
                        <span style={{ color: "var(--text-secondary)" }}>—</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(p.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center" style={{ color: "var(--text-secondary)" }}>
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="card p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-main)" }}>Delete Product?</h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-main)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteProduct(confirmDelete)
                    setConfirmDelete(null)
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-danger text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 overflow-y-auto bg-black/50"
            onClick={() => setModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "var(--text-main)" }}>
                  {editing ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={() => setModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  <XMarkIcon className="w-5 h-5" style={{ color: "var(--text-main)" }} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Product Name *</label>
                    <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Brand *</label>
                    <select value={form.brand} onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }}>
                      {brandOptions.map((b) => (
                        <option key={b.slug} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Category</label>
                    <input type="text" value={form.category} disabled
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none opacity-60"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Price (Rs.) *</label>
                    <input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Original Price</label>
                    <input type="number" value={form.originalPrice} onChange={(e) => handleChange("originalPrice", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Description *</label>
                  <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} required rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Image URLs (one per line)</label>
                  <textarea value={form.images.join("\n")} onChange={(e) => handleImagesChange(e.target.value)} rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Storage Options (comma separated)</label>
                    <input type="text" value={form.storageOptions.join(", ")} onChange={(e) => handleStorageChange(e.target.value)}
                      placeholder="128GB, 256GB, 512GB"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Colors (comma separated)</label>
                    <input type="text" value={form.colors.map((c) => c.name).join(", ")} onChange={(e) => handleColorsChange(e.target.value)}
                      placeholder="Black, White, Blue"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Discount %</label>
                    <input type="number" value={form.discount} onChange={(e) => handleChange("discount", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Rating (1-5)</label>
                    <input type="number" value={form.rating} onChange={(e) => handleChange("rating", e.target.value)} min="1" max="5" step="0.1"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                  </div>
                  <div className="flex items-end gap-4 pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.stock} onChange={(e) => handleChange("stock", e.target.checked)}
                        className="w-4 h-4 rounded" />
                      <span className="text-sm font-medium" style={{ color: "var(--text-main)" }}>In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.featured} onChange={(e) => handleChange("featured", e.target.checked)}
                        className="w-4 h-4 rounded" />
                      <span className="text-sm font-medium" style={{ color: "var(--text-main)" }}>Featured</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-main)" }}>Specifications</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(emptyProduct.specifications).map((key) => (
                      <div key={key}>
                        <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>{key}</label>
                        <input type="text" value={form.specifications[key] || ""} onChange={(e) => handleSpecChange(key, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                          style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)" }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editing ? "Update Product" : "Add Product"}
                  </button>
                  <button type="button" onClick={() => setModal(false)}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium border"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-main)" }}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
