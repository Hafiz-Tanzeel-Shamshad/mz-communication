import { createContext, useContext, useState, useEffect } from "react"
import { products as initialProducts } from "../data/products"

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("mz-products")
      if (!saved) return initialProducts
      const parsed = JSON.parse(saved)
      const merged = initialProducts.map((initial) => {
        const modified = parsed.find((p) => p.id === initial.id)
        return modified ? { ...initial, ...modified } : initial
      })
      const newProducts = parsed.filter(
        (p) => !initialProducts.some((ip) => ip.id === p.id)
      )
      return [...merged, ...newProducts]
    } catch {
      return initialProducts
    }
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    localStorage.setItem("mz-products", JSON.stringify(products))
  }, [products])

  const addProduct = (product) => {
    const newProduct = { ...product, id: `product-${Date.now()}` }
    setProducts((prev) => [newProduct, ...prev])
  }

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const getFilteredProducts = (category, brandSlug) => {
    let filtered = products
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }
    if (brandSlug) {
      filtered = filtered.filter((p) => p.brandSlug === brandSlug)
    }
    return filtered
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        searchQuery,
        setSearchQuery,
        getFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
