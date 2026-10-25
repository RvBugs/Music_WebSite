import { FillIcon, HistoryIcon } from "./icon"

interface Props {
  items: string[]
  onSelect: (q: string) => void // run the search
  onFill: (q: string) => void // put text in the input (the arrow icon)
  onRemove: (q: string) => void
}

export default function RecentList({
  items,
  onSelect,
  onFill,
  onRemove,
}: Props) {
  return (
    <ul className="ms-list">
      {items.map((q) => (
        <li key={q} className="ms-list-item">
          <button
            className="ms-list-main"
            onClick={() => onSelect(q)}
            onContextMenu={(e) => {
              e.preventDefault()
              onRemove(q) // right-click removes an entry
            }}
          >
            <span className="ms-list-icon">
              <HistoryIcon />
            </span>
            <span className="ms-list-text">{q}</span>
          </button>
          <button
            className="ms-icon-btn"
            aria-label={`Use "${q}" in search box`}
            onClick={() => onFill(q)}
          >
            <FillIcon />
          </button>
        </li>
      ))}
    </ul>
  )
}
