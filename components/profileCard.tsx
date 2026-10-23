import "../components/styless.css"


export default function ProfileCard({
  user,
  onAvatarChange,
}: {
  user: {
    name: string
    email: string
    avatar?: string
  }
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const initial = (user.name?.[0] || "?").toUpperCase()

  return (
    <section className="card profile">
      <div className="avatar">
        {user.avatar ? <img src={user.avatar} alt="avatar" /> : initial}
      </div>
      <div>
        <h2 className="name">{user.name}</h2>
        <div className="email">{user.email}</div>
        <input type="file" accept="image/*" onChange={onAvatarChange} />
      </div>
    </section>
  )
}
