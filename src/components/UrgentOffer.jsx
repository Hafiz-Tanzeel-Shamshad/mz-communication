import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function MockPhoneCard() {
  const originalPrice = 500
  const discountedPrice = 150

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative shrink-0 w-48 sm:w-56"
    >
      <div className="absolute -top-2 -right-2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}
      >
        <span className="text-white font-extrabold text-sm sm:text-base leading-none">-70%</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden backdrop-blur-md border border-white/20"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div className="p-3 sm:p-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-white/10 mb-3 flex items-center justify-center">
            <img
              src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-2.jpg"
              alt="iPhone"
              className="w-full h-full object-contain p-2"
              onError={(e) => { e.target.src = "https://placehold.co/200x200/1E3A5F/white?text=Phone" }}
            />
          </div>
          <p className="text-white text-xs font-semibold truncate">iPhone 16 Pro Max</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-white/50 text-xs line-through">$ {originalPrice}</span>
            <span className="text-yellow-300 font-extrabold text-sm">$ {discountedPrice}</span>
          </div>
          <span className="inline-block mt-1.5 text-[10px] font-bold text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full">
            Wholesale Price – MZ only
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function UrgentOffer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 40%, #1E40AF 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.06),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col lg:flex-row items-center gap-6 p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex-1 space-y-5 sm:space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide mx-auto lg:mx-0"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#0F172A" }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🔥
              </motion.span>
              DISCOUNT OFFER
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              UP TO{" "}
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block text-yellow-300"
              >
                70% OFF
              </motion.span>
            </h2>

            <p className="text-blue-100/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Wholesale rates available on all celling phones. Only at{" "}
              <span className="font-bold text-white">MZ Communication</span>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md mx-auto lg:mx-0">
              {[
                { label: "iPhone 16 Pro Max", discount: "8% OFF" },
                { label: "Samsung Galaxy", discount: "15% OFF" },
                { label: "All Phones", discount: "Up to 70%", highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl px-3 py-2 text-center border"
                  style={{
                    background: item.highlight ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.06)",
                    borderColor: item.highlight ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <p className="text-white text-[10px] sm:text-xs font-medium truncate">{item.label}</p>
                  <p className={`font-extrabold text-sm sm:text-base ${item.highlight ? "text-yellow-300" : "text-green-400"}`}>
                    {item.discount}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/iphone/apple"
                  className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B, #D97706)",
                    color: "#0F172A",
                    boxShadow: "0 8px 32px rgba(245,158,11,0.35)",
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  Buy Now
                </Link>
              </motion.div>
              <motion.a
                href="https://wa.me/923367555218"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-xl border-2 border-white/30 text-white"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-flex"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.span>
                Contact via WhatsApp
              </motion.a>
            </div>

            <p className="text-yellow-200/60 text-xs sm:text-sm font-medium">
              Limited stock available. Grab yours now!
            </p>

            <div className="pt-3 text-xs sm:text-sm text-blue-200/60 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              This is imp note — take discounts 70% as soon as possible. Limited time offer. Wholesale rate to celling phone — only shop MZ Communication.
            </div>
          </div>

          <div className="hidden sm:block">
            <MockPhoneCard />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
