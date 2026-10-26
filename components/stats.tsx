import "../components/styless.css"

type StatProps = {
  value: number
  label: string
}

type User = {
  played: number
  playlists: string[]
  genres: string[]
}

type StatsProps = {
  user: User
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="stat">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}

export default function Stats({ user }: StatsProps) {
  return (
    <section className="card">
      <h2>Your listening</h2>

      <div className="stats">
        <Stat value={user.played} label="Songs played" />
        <Stat value={user.playlists.length} label="Playlists" />
        <Stat value={user.genres.length} label="Favourite genres" />
      </div>
    </section>
  )
}
