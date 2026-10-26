import "../components/styless.css"
export default function DangerZone({ onDelete }:{onDelete:() => void}) {
  return (
    <section className="card">
      <h2>Danger zone</h2>
      <button className="danger" onClick={onDelete}>
        Delete my account
      </button>
    </section>
  )
}