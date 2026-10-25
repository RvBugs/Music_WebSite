import type { SVGProps } from "react"

const base: SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
}

export const BackIcon = () => (
  <svg {...base}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)
export const MicIcon = () => (
  <svg {...base}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
)
export const WaveIcon = () => (
  <svg {...base}>
    <path d="M5 9v6M9 5v14M13 8v8M17 10v4M21 11v2" />
  </svg>
)
export const CloseIcon = () => (
  <svg {...base}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)
export const HistoryIcon = () => (
  <svg {...base}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5M12 7v5l3 2" />
  </svg>
)
export const FillIcon = () => (
  <svg {...base}>
    <path d="M17 17 7 7M7 15V7h8" />
  </svg>
)
export const NewIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 16V9l5-1v6" />
    <circle cx="9" cy="16" r="1.5" />
    <circle cx="14" cy="14" r="1.5" />
  </svg>
)
export const ChartsIcon = () => (
  <svg {...base}>
    <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
  </svg>
)
export const MoodsIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01" />
  </svg>
)
