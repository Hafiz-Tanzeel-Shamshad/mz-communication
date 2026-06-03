import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { MagnifyingGlassIcon, SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useTheme } from "../context/ThemeContext"
import { useProducts } from "../context/ProductContext"

export default function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const { searchQuery, setSearchQuery } = useProducts()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate("/search")
      setMenuOpen(false)
    }
  }

  return (
    <nav
      style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">MZ</span>
            </div>
            <span className="text-xl font-bold hidden sm:block" style={{ color: "var(--text-main)" }}>
              MZ Communication
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-secondary)" }} />
              <input
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                className="w-64 pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all duration-200 focus:w-80"
                style={{
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                  border: "1px solid var(--border-color)",
                }}
              />
            </div>

            <Link to="/iphone" className="font-medium text-sm transition-colors hover:text-primary" style={{ color: "var(--text-main)" }}>
              iPhone
            </Link>
            <Link to="/android" className="font-medium text-sm transition-colors hover:text-primary" style={{ color: "var(--text-main)" }}>
              Android
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
              style={{ background: "var(--bg-main)" }}
            >
              {dark ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => navigate("/search")}
              className="p-2 rounded-xl"
              style={{ background: "var(--bg-main)" }}
            >
              <MagnifyingGlassIcon className="w-5 h-5" style={{ color: "var(--text-main)" }} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl"
              style={{ background: "var(--bg-main)" }}
            >
              {dark ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl"
              style={{ background: "var(--bg-main)" }}
            >
              {menuOpen ? (
                <XMarkIcon className="w-6 h-6" style={{ color: "var(--text-main)" }} />
              ) : (
                <Bars3Icon className="w-6 h-6" style={{ color: "var(--text-main)" }} />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-color)" }}
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/iphone"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-xl font-medium text-sm"
                style={{ background: "var(--bg-main)", color: "var(--text-main)" }}
              >
                iPhone
              </Link>
              <Link
                to="/android"
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-xl font-medium text-sm"
                style={{ background: "var(--bg-main)", color: "var(--text-main)" }}
              >
                Android
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
