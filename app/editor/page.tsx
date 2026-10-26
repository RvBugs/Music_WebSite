"use client"

import { use, useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  AudioLines,
  Disc,
  Pencil,
  Play,
  Plus,
  Repeat2,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AddSection from "@/components/AddSection"
import { cn } from "@/lib/utils"
import { Soundfont } from "smplr"
import EditorSidebar from "@/app/editor/sidebar"
import EmptySectionWorkspace from "@/app/editor/empty-section-workspace"
import TopBarEditor from "@/app/editor/top-bar-editor"
import BottomWavePlayer from "@/app/editor/bottom-wave-player"
import { toast } from "@/components/ui/toast"
import updateSongChords from "@/app/editor/updateSongChords"
import { useRouter } from "next/navigation"
import loadEditor from "@/app/editor/loadEditor"

interface Chord {
  id: string
  chord: string
  repeat?: boolean
}

interface Section {
  id: string
  name: string
  description: string
  chords: Chord[]
}

const SLOTS = 4
const TOKEN_RE = /^(?:[A-G][#bm]*|-)$/
const FORMAT_ERROR = "Invalid chord format, should input like Em C# - -"

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

function validateChord(line: string) {
  const tokens = line.trim().split(/\s+/).filter(Boolean)
  return (
    tokens.length > 0 &&
    tokens.length <= SLOTS &&
    tokens.every((t) => TOKEN_RE.test(t))
  )
}

export function parseLine(line: string, repeat = false) {
  const chordRegex = /([A-G-])([#bm]*)/g

  const parsed = [...line.matchAll(chordRegex)]
    .slice(0, SLOTS)
    .map(([, letter, symbols]) => ({ letter, symbols }))

  const slots = [
    ...parsed,
    ...Array.from({ length: SLOTS - parsed.length }, () => null),
  ]

  return slots.map((chord, i) => (
    <td
      key={i}
      className={cn(
        "h-14 border-l border-border/60 px-2 text-center align-middle text-xl font-semibold",
        repeat && i === 0 && "border-l-4 border-double border-l-foreground",
        repeat &&
          i === SLOTS - 1 &&
          "border-r-4 border-double border-r-foreground"
      )}
    >
      {chord &&
        (chord.letter === "-" ? (
          <span className="text-muted-foreground/60">—</span>
        ) : (
          <>
            {chord.letter}
            <sup className="ml-0.5 text-[0.6em] leading-none font-medium">
              {chord.symbols}
            </sup>
          </>
        ))}
    </td>
  ))
}

function SectionTable({
  chords,
  onRemove,
  selectToEdit,
  onToggleRepeat,
}: {
  chords: Chord[]
  onRemove: (id: string) => void
  selectToEdit?: (id: string, chords: string) => void
  onToggleRepeat: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto rounded-sm border bg-card shadow-sm">
      <table className="w-full min-w-140 table-fixed border-collapse">
        <colgroup>
          <col className="w-12" />
          <col />
          <col />
          <col />
          <col />
          <col className="w-44" />
        </colgroup>

        <thead>
          <tr className="border-b bg-muted/50 text-xs font-medium text-muted-foreground">
            <th className="h-10 px-2 text-center">#</th>
            {[1, 2, 3, 4].map((n) => (
              <th
                key={n}
                className="h-10 border-l border-border/60 px-2 text-center"
              >
                Beat {n}
              </th>
            ))}
            <th className="h-10 border-l border-border/60 px-2 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {chords.map((chord, index) => (
            <tr
              key={chord.id}
              className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
            >
              <td className="h-14 px-2 text-center align-middle text-sm text-muted-foreground">
                {index + 1}
              </td>

              {parseLine(chord.chord, chord.repeat)}

              <td className="h-14 border-l border-border/60 px-2 align-middle">
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle repeat"
                    aria-pressed={!!chord.repeat}
                    onClick={() => onToggleRepeat(chord.id)}
                    className={cn(
                      "size-8 text-violet-600 hover:bg-violet-500/20 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-400",
                      chord.repeat ? "bg-violet-500/25" : "bg-violet-500/10"
                    )}
                  >
                    <Repeat2 className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Play line"
                    className="size-8 bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-600 dark:text-green-400 dark:hover:text-green-400"
                  >
                    <Play className="size-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      selectToEdit && selectToEdit(chord.id, chord.chord)
                    }
                    variant="ghost"
                    size="icon"
                    aria-label="Edit line"
                    className="size-8 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete line"
                    onClick={() => onRemove(chord.id)}
                    className="size-8 bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {chords.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No lines yet. Add chords below.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string; name: string; cover: string }>
}) {
  const router = useRouter()
  const [openNewSection, setOpenNewSection] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [newNoteError, setNewNoteError] = useState("")
  const [activeId, setActiveId] = useState("")
  const [sections, setSections] = useState<Section[]>([])
  const [isEditing, setIsEditing] = useState("")

  const activeSection = sections.find((s) => s.id === activeId)

  const addSection = ({
    name,
    description,
  }: {
    name: string
    description: string
  }) => {
    const section: Section = { id: uid(), name, description, chords: [] }
    setSections((ss) => [...ss, section])
    setActiveId(section.id)
    setNewNoteError("")
  }

  const removeSection = (id: string) => {
    const rest = sections.filter((s) => s.id !== id)
    setSections(rest)
    if (id === activeId) {
      setActiveId(rest.at(-1)?.id ?? "")
      setIsEditing("")
      setNewNote("")
    }
  }

  const addLine = () => {
    const value = newNote.trim()

    if (!activeSection) {
      setNewNoteError("Add a section first")
      return
    }
    if (!value) {
      setNewNoteError("Please input a valid chord")
      return
    }
    if (!validateChord(value)) {
      setNewNoteError(FORMAT_ERROR)
      return
    }

    if (isEditing) {
      setSections((all) =>
        all.map((section) =>
          section.id === activeSection.id
            ? {
                ...section,
                chords: section.chords.map((chord) =>
                  chord.id === isEditing ? { ...chord, chord: value } : chord
                ),
              }
            : section
        )
      )

      setIsEditing("")
      setNewNote("")
      setNewNoteError("")
      return
    }

    setSections((ss) =>
      ss.map((s) =>
        s.id === activeSection.id
          ? { ...s, chords: [...s.chords, { id: uid(), chord: value }] }
          : s
      )
    )
    setNewNote("")
    setNewNoteError("")
  }

  const removeLine = (sectionId: string, lineId: string) => {
    // deleting the line being edited cancels the edit
    if (lineId === isEditing) {
      setIsEditing("")
      setNewNote("")
      setNewNoteError("")
    }
    setSections((ss) =>
      ss.map((s) =>
        s.id === sectionId
          ? { ...s, chords: s.chords.filter((c) => c.id !== lineId) }
          : s
      )
    )
  }

  const toggleRepeat = (sectionId: string, lineId: string) =>
    setSections((ss) =>
      ss.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              chords: s.chords.map((c) =>
                c.id === lineId ? { ...c, repeat: !c.repeat } : c
              ),
            }
          : s
      )
    )

  const songData = use(searchParams)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const results = await loadEditor(songData.id, songData.name)

      if (cancelled) return

      if (results.type === "success") {
        setSections(results.data ?? [])
      } else {
        toast.add({
          type: "error",
          title: "Couldn't load song",
          description: results.error,
        })
      }
    }

    if (songData.id) {
      void load()
    }

    return () => {
      cancelled = true
    }
  }, [songData.id])

  const handleSaveChord = async (chord: string) => {
    try {
      const results = await updateSongChords(songData.id, chord)

      if (results.type === "error") {
        toast.add({
          type: "error",
          title: "Couldn't save chord",
          description: results.error,
        })

        return
      } else {
        toast.add({
          type: "success",
          title: "Chord saved successfully",
          description: "Your chord has been saved to the cloud.",
        })
      }

      router.replace("/songs")
    } catch (error) {
      console.error("Error saving chord:", error)
      toast.add({
        type: "error",
        title: "Error saving chord",
        description: "Failed to save chord. Please try again.",
      })
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden">
      {/* Editor takes the available viewport height */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 bg-muted/15">
        <TopBarEditor
          songName={songData.name}
          cover={songData.cover}
          createSongsAction={() => handleSaveChord(JSON.stringify(sections))}
        />

        {/* Only the sections scroll */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full w-full flex-col px-4">
            {sections.length === 0 ? (
              <EmptySectionWorkspace />
            ) : (
              <div className="flex flex-col gap-8">
                {sections.map((s) => (
                  <section key={s.id} className="space-y-2">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={s.id === activeId}
                      onClick={() => setActiveId(s.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setActiveId(s.id)
                      }}
                      className={cn(
                        "flex cursor-pointer flex-row items-center gap-2 rounded-lg border px-2 py-2 transition-colors hover:bg-muted/40",
                        s.id === activeId && "bg-muted/50 ring-1 ring-border"
                      )}
                    >
                      <div className="w-fit rounded-md bg-muted/50 p-2">
                        <AudioLines size={28} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {s.description}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete section"
                        className="size-8 text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSection(s.id)
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    <SectionTable
                      chords={s.chords}
                      onRemove={(lineId) => removeLine(s.id, lineId)}
                      onToggleRepeat={(lineId) => toggleRepeat(s.id, lineId)}
                      selectToEdit={(editId, editChord) => {
                        setActiveId(s.id)
                        setIsEditing(editId)
                        setNewNote(editChord)
                        setNewNoteError("")
                      }}
                    />
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Naturally stays at the bottom; no sticky positioning */}
        <section className="shrink-0 px-4 pb-3">
          <div className="flex w-full flex-col gap-3 rounded-2xl border bg-card p-4">
            <textarea
              rows={1}
              placeholder="Add chords here, e.g. Em C# - -"
              className="min-h-8 w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              value={newNote}
              onChange={(e) => {
                const value = e.target.value
                setNewNote(value)
                setNewNoteError(
                  value.trim() && !validateChord(value) ? FORMAT_ERROR : ""
                )
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  addLine()
                }
              }}
            />

            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Add section"
                  onClick={() => setOpenNewSection(true)}
                >
                  <Plus />
                </Button>

                {newNoteError ? (
                  <p className="truncate text-xs text-destructive">
                    {newNoteError}
                  </p>
                ) : (
                  activeSection && (
                    <p className="truncate text-xs text-muted-foreground">
                      {isEditing ? "Editing line in" : "Adding to"}{" "}
                      {activeSection.name}
                    </p>
                  )
                )}
              </div>

              <Button
                aria-label={isEditing ? "Save line" : "Add line"}
                size="icon"
                onClick={addLine}
              >
                <ArrowUp className="size-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Player remains within the viewport */}
      {/*<div className="shrink-0">*/}
      {/*  <BottomWavePlayer />*/}
      {/*</div>*/}

      <AddSection
        open={openNewSection}
        onOpenChange={setOpenNewSection}
        setNewSection={addSection}
      />
    </div>
  )
}
