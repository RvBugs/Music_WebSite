import { LoaderCircle } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderCircle className="sbu" />
      <p>Loading</p>
    </div>
  )
}
