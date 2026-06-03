import { NavLink } from "react-router-dom"
import { Squares2X2Icon, CubeIcon, TagIcon } from "@heroicons/react/24/outline"

const links = [
  { to: "/admin", label: "Dashboard", icon: Squares2X2Icon, end: true },
  { to: "/admin/products", label: "Products", icon: CubeIcon },
  { to: "/admin/categories", label: "Categories", icon: TagIcon },
]

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-16 lg:top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ background: "var(--bg-card)", borderRight: "1px solid var(--border-color)" }}
      >
        <div className="p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "white" : "var(--text-main)",
              })}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  )
}
