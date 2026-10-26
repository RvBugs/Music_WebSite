// Page opened after you press Enter: /search/results?q=...
export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = "" } = await searchParams

  // TODO: fetch songs from your API/database here, e.g.
  // const songs = await fetch(`http://localhost:3000/api/songs?q=${encodeURIComponent(q)}`).then(r => r.json());

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: 24,
      }}
    >
      <h1>Results for “{q}”</h1>
    </main>
  )
}
