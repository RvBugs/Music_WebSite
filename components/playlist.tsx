"use client"

import "../components/styless.css"

import { useState } from "react"

export default function Playlists({ playlists, onAdd, onRemove } :{playlists: string[],onAdd:(name:string) => void,onRemove:(index:number) => void}) {
  const [newName, setNewName] = useState("")

  const handleAdd = () => {
    const v = newName.trim()
    if (!v) return
    onAdd(v)
    setNewName("")
  }

  return (
    <section className="card">
      <h2>My playlists</h2>
      <div>
        {playlists.map((p, i) => (
          <div className="pl" key={p + i}>
            <span>🎶 {p}</span>
            <button className="ghost" onClick={() => onRemove(i)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="actions">
        <input
          placeholder="New playlist name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </section>
  )
}
