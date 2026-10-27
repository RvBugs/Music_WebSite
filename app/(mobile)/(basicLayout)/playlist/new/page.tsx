"use client"

import { useEffect, useRef, useState } from "react"
import {
  ListMusic,
  LoaderCircle,
  Plus,
  ImagePlus,
  Music2,
  ChevronRight,
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

import createNewPlaylist from "@/app/(mobile)/(basicLayout)/playlist/new/createNewPlaylist"
import { toast } from "@/components/ui/toast"
import { load, Song } from "@/app/(mobile)/(basicLayout)/songs/load"
import SongPicker from "@/app/(mobile)/(basicLayout)/playlist/new/songPicker"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"]

type PlaylistErrors = {
  name?: string
}

export default function NewPlaylistPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState("")
  const [errors, setErrors] = useState<PlaylistErrors>({})
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState<Song[]>([])
  const [songsLoading, setSongsLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    let active = true

    load()
      .then((result) => {
        if (!active) return
        if (result.type === "success") setSongs(result.data ?? [])
        setSongsLoading(false)
      })
      .catch(() => {
        if (active) setSongsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

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

  function validate() {
    const nextErrors: PlaylistErrors = {}

    if (!name.trim()) {
      nextErrors.name = "Please enter a playlist name."
    } else if (name.trim().length > 100) {
      nextErrors.name = "Playlist name must be 100 characters or fewer."
    }

    if (!coverImage && !imageError) {
      setImageError("Playlist cover image is required.")
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0 && !!coverImage && !imageError
  }

  async function handleCreatePlaylist() {
    if (loading || !validate()) return

    setLoading(true)

    try {
      if (coverImage === null) {
        setImageError("Cover image is required.")
        return
      }

      const formData = new FormData()
      formData.append("name", name.trim())
      formData.append("cover", coverImage)
      formData.append("songIds", JSON.stringify(selectedIds))

      const result = await createNewPlaylist(formData)

      if (
        result.type === "error" ||
        result.type === "uploadError" ||
        result.type === "userNotFound"
      ) {
        toast.add({
          type: "error",
          title: "Error creating playlist",
          description: result.error,
        })
        return
      }

      if (result.type === "songsError") {
        toast.add({
          type: "error",
          title: "Playlist created, but songs were not added",
          description: result.error,
        })
      } else {
        toast.add({
          type: "success",
          title: "Playlist created successfully",
          description:
            selectedIds.length > 0
              ? `${selectedIds.length} song(s) added to your playlist.`
              : "You can now add songs to your playlist.",
        })
      }

      router.replace(`/playlist/${result.id}`)
    } catch {
      toast.add({
        type: "error",
        title: "Error creating playlist",
        description: "Unable to create the playlist. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    if (loading) return

    setName("")
    setCoverImage(null)
    setSelectedIds([])
    setImageError("")
    setErrors({})

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (pickerOpen) {
    return (
      <SongPicker
        songs={songs}
        selected={selectedIds}
        onChange={setSelectedIds}
        onDone={() => setPickerOpen(false)}
      />
    )
  }

  return (
    <div className="min-h-full px-4 py-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-primary/10 text-primary">
            <ListMusic className="size-6" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h1 className="text-lg font-semibold tracking-tight">
              Create a playlist
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Set up the playlist details before adding your songs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <FieldSet>
            <FieldLegend>Playlist details</FieldLegend>
            <FieldDescription>
              Enter the basic information for your new playlist.
            </FieldDescription>

            <FieldGroup className="mt-5 gap-5 ">
              {/* Cover image */}
              <Field className="gap-2">
                <FieldLabel htmlFor="playlist-cover">
                  Playlist cover <span className="text-destructive">*</span>
                </FieldLabel>

                <input
                  ref={fileInputRef}
                  id="playlist-cover"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden flex-row  "
                  disabled={loading}
                  onChange={(event) => {
                    handleImageChange(event.target.files?.[0])
                    event.target.value = ""
                  }}
                />

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    aria-label="Choose playlist cover image"
                    className="group relative flex aspect-square h-35 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreview}
                        alt="Playlist cover preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-primary">
                        <ImagePlus className="size-8" />
                        <span className="text-xs font-medium">Add artwork</span>
                      </div>
                    )}
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col items-start gap-2  ">
                    {imageError ? (
                      <p role="alert" className="text-sm text-destructive">
                        {imageError}
                      </p>
                    ) : (
                      <FieldDescription>
                        A cover image is required. PNG, JPG, or WebP, up to 5 MB.
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

              {/* Playlist name */}
              <Field className="gap-2">
                <FieldLabel htmlFor="playlist-name">
                  Playlist name <span className="text-destructive">*</span>
                </FieldLabel>

                <div className="relative">
                  <ListMusic className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    aria-label="playlist name"
                    id="playlist-name"
                    autoComplete="off"
                    placeholder="e.g. Sunday Service"
                    value={name}
                    maxLength={100}
                    onChange={(event) => {
                      setName(event.target.value)
                      setErrors((previous) => ({ ...previous, name: undefined }))
                    }}
                    aria-invalid={!!errors.name}
                    className="h-11 rounded-xl pl-10"
                    disabled={loading}
                  />
                </div>

                {errors.name ? (
                  <p className="text-sm text-destructive">{errors.name}</p>
                ) : (
                  <FieldDescription>
                    Give your playlist a recognizable title.
                  </FieldDescription>
                )}
              </Field>

              {/*/!* Description *!/*/}
              {/*<Field className="gap-2">*/}
              {/*  <FieldLabel htmlFor="playlist-description">Description</FieldLabel>*/}

              {/*  <div className="relative">*/}
              {/*    <AlignLeft className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />*/}

              {/*    <Input*/}
              {/*      aria-label="playlist description"*/}
              {/*      id="playlist-description"*/}
              {/*      autoComplete="off"*/}
              {/*      placeholder="Optional short description"*/}
              {/*      value={description}*/}
              {/*      maxLength={200}*/}
              {/*      onChange={(event) => {*/}
              {/*        setDescription(event.target.value)*/}
              {/*        setErrors((previous) => ({*/}
              {/*          ...previous,*/}
              {/*          description: undefined,*/}
              {/*        }))*/}
              {/*      }}*/}
              {/*      aria-invalid={!!errors.description}*/}
              {/*      className="h-11 rounded-xl pl-10"*/}
              {/*      disabled={loading}*/}
              {/*    />*/}
              {/*  </div>*/}

              {/*  {errors.description && (*/}
              {/*    <p className="text-sm text-destructive">{errors.description}</p>*/}
              {/*  )}*/}
              {/*</Field>*/}

              {/* Songs */}
              <Field className="gap-2">
                <FieldLabel>Songs</FieldLabel>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 justify-between rounded-xl"
                  onClick={() => setPickerOpen(true)}
                  disabled={loading || songsLoading}
                >
                  <span className="flex items-center gap-2">
                    <Music2 className="size-4 text-muted-foreground" />
                    {songsLoading
                      ? "Loading songs..."
                      : selectedIds.length > 0
                        ? `${selectedIds.length} song(s) selected`
                        : "Add songs"}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Button>

                <FieldDescription>
                  Optional. Tick the songs you want in this playlist.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

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
              onClick={handleCreatePlaylist}
              disabled={loading}
              className="h-11 rounded-xl sm:min-w-44"
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Creating playlist...
                </>
              ) : (
                <>
                  <Plus className="mr-2 size-4" />
                  Create new playlist
                </>
              )}
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You can change the songs in your playlist later.
        </p>
      </div>
    </div>
  )
}
