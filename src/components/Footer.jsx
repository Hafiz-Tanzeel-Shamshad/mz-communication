import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">MZ</span>
              </div>
              <span className="text-lg sm:text-xl font-bold" style={{ color: "var(--text-main)" }}>
                MZ Communication
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your trusted destination for premium smartphones. We offer the latest iPhones and Android devices
              from top brands at competitive prices in Pakistan.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4" style={{ color: "var(--text-main)" }}>Shop</h3>
            <div className="space-y-2">
              <Link to="/iphone" className="block text-sm transition-colors hover:text-primary py-1" style={{ color: "var(--text-secondary)" }}>
                iPhone
              </Link>
              <Link to="/android" className="block text-sm transition-colors hover:text-primary py-1" style={{ color: "var(--text-secondary)" }}>
                Android
              </Link>
              <Link to="/android/samsung" className="block text-sm transition-colors hover:text-primary py-1" style={{ color: "var(--text-secondary)" }}>
                Samsung
              </Link>
              <Link to="/android/google-pixel" className="block text-sm transition-colors hover:text-primary py-1" style={{ color: "var(--text-secondary)" }}>
                Google Pixel
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4" style={{ color: "var(--text-main)" }}>Contact</h3>
            <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <p className="py-0.5">+92 336 7555218</p>
              <p className="py-0.5">Islamabad, Pakistan</p>
              <a
                href="https://wa.me/923367555218"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary hover:underline py-0.5"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm"
          style={{ borderTop: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
        >
          &copy; {new Date().getFullYear()} MZ Communication. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
