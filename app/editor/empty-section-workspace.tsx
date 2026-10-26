import { Button } from "@/components/ui/button"
import { AudioLines } from "lucide-react"

export default function EmptySectionWorkspace() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted/30">
          <AudioLines />
        </div>

        <h2 className="text-xl font-medium">Your music starts here</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          To create your first section or use the +
          button in the text input to add a new section.
        </p>
      </div>
    </div>
  )
}
