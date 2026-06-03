import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import WhatsAppFloat from "./WhatsAppFloat"
import AdminSidebar from "./AdminSidebar"
import { Bars3Icon } from "@heroicons/react/24/outline"

export default function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      {isAdmin ? (
        <>
          <nav
            className="sticky top-0 z-50 h-16 flex items-center px-4 lg:px-8"
            style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl mr-3"
              style={{ background: "var(--bg-main)" }}
            >
              <Bars3Icon className="w-5 h-5" style={{ color: "var(--text-main)" }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">MZ</span>
              </div>
              <span className="font-bold text-sm" style={{ color: "var(--text-main)" }}>MZ Admin</span>
            </div>
          </nav>
          <div className="flex flex-1">
            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <WhatsAppFloat />
          <Footer />
        </>
      )}
    </div>
  )
}
