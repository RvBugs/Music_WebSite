"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Line = { id: string; text: string }
type Group = { id: string; repeat: number; lines: Line[] }

const uid = () => crypto.randomUUID()

const parseLine = (text: string) =>
  text.split(/[\s,]+/).filter(Boolean).slice(0, 4)

function Chord({ name }: { name: string }) {
  if (name === "-") {
    return <span className="text-muted-foreground">—</span> // hold previous chord
  }

  const [main, bass] = name.split("/")
  const match = main.match(/^([A-G][#b]?)(.*)$/)
  if (!match) return <span>{name}</span>

  const [, root, quality] = match

  return (
    <span className="inline-flex items-start">
      {root}
      {quality && (
        <sup className="ml-0.5 text-[0.65em] leading-none">{quality}</sup>
      )}
      {bass && <span>/{bass}</span>}
    </span>
  )
}

function ChordLine({ text }: { text: string }) {
  const chords = parseLine(text)

  return (
    <div className="grid h-14 grid-cols-4 border-r-2 border-foreground text-xl font-medium">
      {chords.map((c, i) => (
        <div
          key={i}
          className="flex items-center justify-center border-l-2 border-foreground"
        >
          <Chord name={c} />
        </div>
      ))}
    </div>
  )
}

export default function ChordsComponent() {
  const [editing] = useState(true)
  const [chords, setChords] = useState("")
  const [groups, setGroups] = useState<Group[]>([
    {
      id: uid(),
      repeat: 2,
      lines: [
        { id: uid(), text: "Em - Bm -" },
        { id: uid(), text: "C - Bm -" },
      ],
    },
  ])

  // start a new empty group (new bracket)
  const addGroup = () =>
    setGroups((gs) => [...gs, { id: uid(), repeat: 1, lines: [] }])

  // add a line to the last group (creates one if none exist)
  const addNewLine = () => {
    if (!parseLine(chords).length) return
    const line: Line = { id: uid(), text: chords.trim() }

    setGroups((gs) => {
      if (gs.length === 0) return [{ id: uid(), repeat: 1, lines: [line] }]
      const last = gs[gs.length - 1]
      return [...gs.slice(0, -1), { ...last, lines: [...last.lines, line] }]
    })
    setChords("")
  }

  return (
    <div className="space-y-6 p-2">
      {groups.map((g) => (
        <section key={g.id} className="space-y-2">
          <div className="flex gap-3">
            {/* repeat bracket + count */}
            <div className="flex flex-col items-center">
              <div
                className={
                  g.repeat > 1
                    ? "w-2 flex-1 rounded-l-sm border-y-2 border-l-2 border-foreground"
                    : "w-2 flex-1"
                }
              />
              {g.repeat > 1 && (
                <span className="mt-1 text-sm font-semibold">×{g.repeat}</span>
              )}
            </div>

            <div className="flex-1 space-y-1">
              {g.lines.map((line) => (
                <ChordLine key={line.id} text={line.text} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {editing && (
        <div className="space-y-2">
          <Input
            value={chords}
            placeholder="Em - - -   (Enter to add line)"
            onChange={(e) => setChords(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewLine()}
          />
          <div className="flex gap-2">
            <Button className="flex-1" onClick={addNewLine}>
              <Plus className="mr-1 size-4" /> Add line
            </Button>
            <Button variant="outline" className="flex-1" onClick={addGroup}>
              <Plus className="mr-1 size-4" /> New group
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}