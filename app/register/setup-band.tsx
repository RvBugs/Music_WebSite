"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"
import { useBandSetupStore } from "./band-setup-store"

export default function SetupBand({ nextPageAction }: { nextPageAction: () => void }) {

  const bandName = useBandSetupStore((state) => state.bandName)
  const bandDescription = useBandSetupStore((state) => state.bandDescription)
  const errors = useBandSetupStore((state) => state.errors)
  const setBandName = useBandSetupStore((state) => state.setBandName)
  const setBandDescription = useBandSetupStore(
    (state) => state.setBandDescription
  )

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
          <Label htmlFor="bandName">Band Name</Label>
          <Input
            id="bandName"
            value={bandName}
            onChange={(event) => setBandName(event.target.value)}
            placeholder="e.g. Flashback Records"
            className="rounded-md"
            aria-invalid={!!errors.bandName}
            aria-label="Band Name"
          />

          {errors.bandName ? (
            <p className="text-xs text-destructive">{errors.bandName}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Enter your band name to manage chords
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bandDescription">Band Description</Label>
          <Textarea
            id="bandDescription"
            value={bandDescription}
            onChange={(event) => setBandDescription(event.target.value)}
            placeholder="Tell us about your band..."
            className="h-30 rounded-md"
            aria-invalid={!!errors.bandDescription}
            aria-label="Band Description"
          />

          {errors.bandDescription ? (
            <p className="text-xs text-destructive">{errors.bandDescription}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Enter your band description
            </p>
          )}
        </div>

        <Button
          type="button"
          className="mt-4 h-10 w-full rounded-xl font-medium"
          onClick={nextPageAction}
        >
          Setup My Band, Then
          <ChevronRightIcon className="ml-2 size-5" />
        </Button>
      </div>
    </>
  )
}
