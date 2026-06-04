import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { ProductProvider } from "./context/ProductContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import BrandPage from "./pages/BrandPage"
import ProductDetail from "./pages/ProductDetail"
import SearchPage from "./pages/SearchPage"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminCategories from "./pages/admin/Categories"

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/iphone" element={<Navigate to="/iphone/apple" replace />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/:category/:brand" element={<BrandPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </ThemeProvider>
  )
}
