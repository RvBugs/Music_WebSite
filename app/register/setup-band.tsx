import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"

export default function SetupBand({ nextPage }: { nextPage: () => void }) {
  return (
    <>
      <div className="pb-6">
        <h2 className="text-lg font-medium">Setup New Band</h2>
        <p className="text-xs text-muted-foreground">
          Create a new band to manage all chords in a single place
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Band Name</Label>
          <Input
            type="text"
            placeholder="e.g. Flashback Records"
            aria-label="Band Name"
            className="rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            Enter your band name, to manage chords
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Band Description</Label>
          <Textarea
            placeholder="e.g. This is flashback records ...."
            aria-label="Band description"
            className="h-30 rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            Enter your band description
          </p>
        </div>

        <Button
          className="mt-4 h-10 w-full rounded-xl font-medium"
          onClick={nextPage}
        >
          Setup My Band, Then
          <ChevronRightIcon className="ml-2 size-5" />
        </Button>
      </div>
    </>
  )
}
