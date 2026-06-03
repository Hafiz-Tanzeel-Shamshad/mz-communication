export default function Logo({ className = "", size = "md" }) {
  const sizes = {
    sm: { width: 180, height: 67 },
    md: { width: 240, height: 89 },
    lg: { width: 300, height: 112 },
  }
  const { width, height } = sizes[size] || sizes.md

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 220 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mzGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="40%" stopColor="#CC0000" />
          <stop offset="70%" stopColor="#990000" />
          <stop offset="100%" stopColor="#5C0000" />
        </linearGradient>
        <linearGradient id="swooshGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF1A1A" stopOpacity="0" />
          <stop offset="30%" stopColor="#FF1A1A" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF4444" stopOpacity="1" />
          <stop offset="70%" stopColor="#FF1A1A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF1A1A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="40%" stopColor="#9CA3AF" />
          <stop offset="70%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="25%" stopColor="#FFD700" />
          <stop offset="45%" stopColor="#F0C040" />
          <stop offset="60%" stopColor="#DAA520" />
          <stop offset="80%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="dividerGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0" />
          <stop offset="50%" stopColor="#E0E0E0" stopOpacity="1" />
          <stop offset="100%" stopColor="#C0C0C0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform="translate(110, 30)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="'Inter', 'Arial Black', sans-serif"
          fontSize="36"
          fontWeight="900"
          letterSpacing="2"
          fill="url(#mzGrad)"
        >
          MZ
        </text>

        <rect
          x="-38"
          y="-3"
          width="76"
          height="5"
          rx="2.5"
          fill="url(#swooshGrad)"
          opacity="0.85"
        />
      </g>

      <line
        x1="20"
        y1="46"
        x2="50"
        y2="46"
        stroke="url(#dividerGrad)"
        strokeWidth="1"
      />
      <text
        x="110"
        y="49"
        textAnchor="middle"
        fontFamily="'Inter', 'Segoe UI', sans-serif"
        fontSize="8"
        fontWeight="600"
        letterSpacing="3"
        fill="url(#silverGrad)"
      >
        COMMUNICATION
      </text>
      <line
        x1="170"
        y1="46"
        x2="200"
        y2="46"
        stroke="url(#dividerGrad)"
        strokeWidth="1"
      />

      <text
        x="110"
        y="74"
        textAnchor="middle"
        fontFamily="'Inter', 'Arial Black', sans-serif"
        fontSize="20"
        fontWeight="900"
        letterSpacing="4"
        fill="url(#goldGrad)"
      >
        MOBILE
      </text>
    </svg>
  )
}
