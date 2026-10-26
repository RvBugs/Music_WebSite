import "../components/styless.css"

export default function Header({ onLogout } :{onLogout:() => void}) {
  return (
    <header>
      <h1>🎵 MusicApp</h1>
      <button className="ghost" onClick={onLogout}>
        Sign out
      </button>
    </header>
  )
}
