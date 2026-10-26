import Link from "next/link"
import type { QuickLink } from "@/types/search"
import { ChartsIcon, MoodsIcon, NewIcon } from "./icon"

const icons = { new: <NewIcon />, charts: <ChartsIcon />, moods: <MoodsIcon /> }

export default function QuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <nav className="ms-tiles" aria-label="Browse">
      {links.map((l) => (
        <Link key={l.id} href={l.href} className="ms-tile">
          {icons[l.icon]}
          <span>{l.label}</span>
        </Link>
      ))}
    </nav>
  )
}
