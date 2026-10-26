import type { RecentVisit } from "@/types/search"

interface Props {
  items: RecentVisit[]
  onSelect: (q: string) => void
}

export default function RecentCards({ items, onSelect }: Props) {
  if (!items.length) return null
  return (
    <section aria-labelledby="ms-recent-title">
      <h2 id="ms-recent-title" className="ms-section-title">
        Recent searches
      </h2>
      <div className="ms-cards">
        {items.map((it) => (
          <button
            key={it.id}
            className="ms-card"
            onClick={() => onSelect(it.query)}
          >
            <div
              className="ms-card-img"
              style={
                it.thumbnail
                  ? { backgroundImage: `url(${it.thumbnail})` }
                  : undefined
              }
            />
            <span className="ms-card-title">{it.title}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
