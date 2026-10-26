import "../components/styless.css"
import { useState, useEffect } from "react"
import type { FormEvent } from "react"

const GENRES = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "EDM",
  "Folk",
  "R&B",
]

const COUNTRIES = [
  "Sri Lanka",
  "India",
  "United Kingdom",
  "United States",
  "Other",
]

// User data type
type User = {
  name: string
  email: string
  country: string
  genres: string[]
}

// Props type
type ProfileFormProps = {
  user: User
  onSave: (user: User) => void
}

export default function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [country, setCountry] = useState(user.country)
  const [genres, setGenres] = useState<string[]>(user.genres)

  // Keep the form in sync if the user object changes
  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setCountry(user.country)
    setGenres(user.genres)
  }, [user])

  // Add or remove a genre
  const toggleGenre = (g: string) =>
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSave({
      name: name.trim(),
      email: email.trim(),
      country,
      genres,
    })
  }

  return (
    <section className="card">
      <h2>Profile details</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="display-name">Display name</label>
            <input
              id="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <label htmlFor="country">Country</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Favourite genres</label>

        <div className="genres">
          {GENRES.map((g) => (
            <div
              key={g}
              className={"chip" + (genres.includes(g) ? " on" : "")}
              onClick={() => toggleGenre(g)}
            >
              {g}
            </div>
          ))}
        </div>

        <div className="actions">
          <button type="submit">Save changes</button>
        </div>
      </form>
    </section>
  )
}
