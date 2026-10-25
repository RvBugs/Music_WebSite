export interface RecentVisit {
  id: string
  title: string // e.g. "Shane Filan - Beautiful In White"
  thumbnail?: string // image URL (optional, a gradient is shown if empty)
  query: string // text used when the card is clicked
}

export interface QuickLink {
  id: string
  label: string
  href: string
  icon: "new" | "charts" | "moods"
}
