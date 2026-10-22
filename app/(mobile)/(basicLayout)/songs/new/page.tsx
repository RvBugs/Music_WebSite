"use client"

import { useEffect, useRef, useState } from "react"
import {
  Music2,
  Clock3,
  AudioLines,
  LoaderCircle,
  Plus,
  ImagePlus,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import createNewSong from "@/app/(mobile)/(basicLayout)/songs/new/createNewSong"
import { toast } from "@/components/ui/toast"

const timeSignatures = [
  { label: "4/4", value: "4/4", description: "Common time" },
  { label: "3/4", value: "3/4", description: "Waltz time" },
  { label: "6/8", value: "6/8", description: "Compound duple" },
  { label: "7/8", value: "7/8", description: "Asymmetric meter" },
  { label: "2/4", value: "2/4", description: "March time" },
  { label: "5/4", value: "5/4", description: "Five beats per bar" },
  { label: "12/8", value: "12/8", description: "Compound quadruple" },
]

const scales = [
  "C",
  "Cm",
  "C#",
  "C#m",
  "D",
  "Dm",
  "D#",
  "D#m",
  "E",
  "Em",
  "F",
  "Fm",
  "F#",
  "F#m",
  "G",
  "Gm",
  "G#",
  "G#m",
  "A",
  "Am",
  "A#",
  "A#m",
  "B",
  "Bm",
]

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"]

type SongErrors = {
  name?: string
  timeSignature?: string
  scale?: string
}

export default function NewSongPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState("")
  const [timeSignature, setTimeSignature] = useState("")
  const [scale, setScale] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState("")
  const [errors, setErrors] = useState<SongErrors>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!coverImage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagePreview(null)
      return
    }

    const previewUrl = URL.createObjectURL(coverImage)
    setImagePreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [coverImage])

  function handleImageChange(file?: File) {
    if (!file) return

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Choose a PNG, JPG, or WebP image.")
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be 5 MB or smaller.")
      return
    }

    setCoverImage(file)
    setImageError("")
  }

  function removeImage() {
    setCoverImage(null)
    setImageError("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function validate() {
    const nextErrors: SongErrors = {}

    if (!name.trim()) {
      nextErrors.name = "Please enter a song name."
    } else if (name.trim().length > 100) {
      nextErrors.name = "Song name must be 100 characters or fewer."
    }

    if (!timeSignature) {
      nextErrors.timeSignature = "Choose a time signature."
    }

    if (!scale) {
      nextErrors.scale = "Choose the song's key or scale."
    }

    if (!coverImage && !imageError) {
      setImageError("Song cover image is required.")
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0 && !!coverImage && !imageError
  }

  async function handleCreateSong() {
    if (loading || !validate()) return

    setLoading(true)

    try {

      if (coverImage === null) {
        setImageError("Cover image is required.")
        return
      }

      const result = await createNewSong(name.trim(), timeSignature, scale ,coverImage)

      if (result.type === "error" || result.type === "uploadError") {
        toast.add({
          type: "error",
          title: "Error creating song",
          description: result.error,
        })
        return
      }

      toast.add({
        type: "success",
        title: "Song created successfully",
        description: "You can now add chords to your song.",
      })

      router.replace(`/editor?id=${result.id}&name=${result.name}&cover=${result.cover}`)
    } catch {
      toast.add({
        type: "error",
        title: "Error creating song",
        description: "Unable to create the song. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    if (loading) return

    setName("")
    setTimeSignature("")
    setScale("")
    setCoverImage(null)
    setImageError("")
    setErrors({})

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-full px-4 py-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-2xl">
        {/* Page heading */}
        <div className="mb-6 flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-primary/10 text-primary">
            <Music2 className="size-6" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h1 className="text-lg font-semibold tracking-tight">
              Create a song
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Set up the song details before adding your chords.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <FieldSet>
            <FieldLegend>Song details</FieldLegend>
            <FieldDescription>
              Enter the basic musical information for your new song. Fields
              marked as required must be completed.
            </FieldDescription>

            <FieldGroup className="mt-5 gap-5">
              {/* Cover image */}
              <Field className="gap-2">
                <FieldLabel htmlFor="song-cover">
                  Song cover <span className="text-destructive">*</span>
                </FieldLabel>

                <input
                  ref={fileInputRef}
                  id="song-cover"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={loading}
                  onChange={(event) => {
                    handleImageChange(event.target.files?.[0])
                    event.target.value = ""
                  }}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    aria-label="Choose song cover image"
                    className="group relative flex aspect-square h-35 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreview}
                        alt="Song cover preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-primary">
                        <ImagePlus className="size-8" />
                        <span className="text-xs font-medium">Add artwork</span>
                      </div>
                    )}
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                    {imageError ? (
                      <p role="alert" className="text-sm text-destructive">
                        {imageError}
                      </p>
                    ) : (
                      <FieldDescription>
                        A cover image is required. PNG, JPG, or WebP, up to 5
                        MB.
                      </FieldDescription>
                    )}

                    {coverImage && (
                      <p className="max-w-full truncate text-xs text-muted-foreground">
                        {coverImage.name} ·{" "}
                        {(coverImage.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>
              </Field>

              {/* Song name */}
              <Field className="gap-2">
                <FieldLabel htmlFor="song-name">
                  Song name <span className="text-destructive">*</span>
                </FieldLabel>

                <div className="relative">
                  <Music2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    aria-label="song name"
                    id="song-name"
                    autoComplete="off"
                    placeholder="e.g. Paper Crown"
                    value={name}
                    maxLength={100}
                    onChange={(event) => {
                      setName(event.target.value)
                      setErrors((previous) => ({
                        ...previous,
                        name: undefined,
                      }))
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "song-name-error" : "song-name-description"
                    }
                    className="h-11 rounded-xl pl-10"
                    disabled={loading}
                  />
                </div>

                {errors.name ? (
                  <p id="song-name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                ) : (
                  <FieldDescription id="song-name-description">
                    Give your song a recognizable title.
                  </FieldDescription>
                )}
              </Field>

              {/* Time signature and scale */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field className="gap-2">
                  <FieldLabel htmlFor="time-signature">
                    Time signature <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Select
                    value={timeSignature}
                    onValueChange={(value) => {
                      if (value === null) return

                      setTimeSignature(value)
                      setErrors((previous) => ({
                        ...previous,
                        timeSignature: undefined,
                      }))
                    }}
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="time-signature"
                      className="h-11 w-full rounded-xl"
                      aria-invalid={!!errors.timeSignature}
                      aria-describedby={
                        errors.timeSignature
                          ? "time-signature-error"
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Clock3 className="size-4 text-muted-foreground" />
                        <SelectValue placeholder="Select meter" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {timeSignatures.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <span className="font-medium">{item.label}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.timeSignature ? (
                    <p
                      id="time-signature-error"
                      className="text-sm text-destructive"
                    >
                      {errors.timeSignature}
                    </p>
                  ) : (
                    <FieldDescription>
                      Beats and rhythm per measure.
                    </FieldDescription>
                  )}
                </Field>

                <Field className="gap-2">
                  <FieldLabel htmlFor="song-scale">
                    Key / scale <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Select
                    value={scale}
                    onValueChange={(value) => {
                      if (value === null) return

                      setScale(value)
                      setErrors((previous) => ({
                        ...previous,
                        scale: undefined,
                      }))
                    }}
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="song-scale"
                      className="h-11 w-full rounded-xl"
                      aria-invalid={!!errors.scale}
                      aria-describedby={
                        errors.scale ? "song-scale-error" : undefined
                      }
                    >
                      <div className="flex items-center gap-2">
                        <AudioLines className="size-4 text-muted-foreground" />
                        <SelectValue placeholder="Select key" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {scales.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.scale ? (
                    <p
                      id="song-scale-error"
                      className="text-sm text-destructive"
                    >
                      {errors.scale}
                    </p>
                  ) : (
                    <FieldDescription>The song&#39;s musical key.</FieldDescription>
                  )}
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="h-11 rounded-xl sm:min-w-28"
            >
              Close
            </Button>

            <Button
              type="button"
              onClick={handleCreateSong}
              disabled={loading}
              className="h-11 rounded-xl sm:min-w-44"
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Creating song...
                </>
              ) : (
                <>
                  <Plus className="mr-2 size-4" />
                  Create new song
                </>
              )}
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You can add and edit chords after creating your song.
        </p>
      </div>
    </div>
  )
}
