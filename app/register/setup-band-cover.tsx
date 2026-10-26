"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronRightIcon, ImagePlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBandSetupStore } from "./band-setup-store"

export default function SetupBandCover({
  previousAction,
  nextPageAction,
}: {
  previousAction: () => void
  nextPageAction: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const bandCover = useBandSetupStore((state) => state.bandCover)
  const errors = useBandSetupStore((state) => state.errors)
  const setBandCover = useBandSetupStore((state) => state.setBandCover)

  useEffect(() => {
    if (!bandCover) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null)
      return
    }

    const url = URL.createObjectURL(bandCover)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [bandCover])

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setBandCover(file)
    event.target.value = ""
  }

  function removeImage() {
    setBandCover(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="relative">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex size-48 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/40 bg-muted/40 transition-colors hover:border-primary"
          aria-label="Upload band cover image"
        >
          {preview ? (
            <img
              src={preview}
              alt="Band cover preview"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary">
              <ImagePlus className="size-8" />
              <span className="text-xs font-medium">Upload image</span>
            </div>
          )}
        </button>

        {preview && (
          <button
            type="button"
            onClick={removeImage}
            className="hover:text-destructive-foreground absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-background shadow-md transition-colors hover:bg-destructive"
            aria-label="Remove cover image"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-medium">Band Profile Picture</p>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG, JPG, or WebP · Maximum 5 MB
        </p>
      </div>

      {errors.bandCover && (
        <p className="text-center text-sm text-destructive">
          {errors.bandCover}
        </p>
      )}

      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        onClick={() => fileInputRef.current?.click()}
      >
        <ImagePlus className="mr-2 size-4" />
        {preview ? "Change image" : "Choose image"}
      </Button>

      <div className="flex w-full items-center justify-center gap-2">
        <Button
          type="button"
          onClick={previousAction}
          variant="outline"
          className="mt-4 h-10 w-1/3 rounded-xl font-medium"
        >
          Previous
        </Button>

        <Button
          type="button"
          onClick={nextPageAction}
          className="mt-4 h-10 w-2/3 rounded-xl font-medium"
        >
          Add My Band Cover, Then
          <ChevronRightIcon className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  )
}
