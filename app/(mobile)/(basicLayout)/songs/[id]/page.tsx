import getSongFromId from "@/app/(mobile)/(basicLayout)/songs/[id]/getSong"
import { Button } from "@/components/ui/button"
import { ArrowLeft, EditIcon, StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const SLOTS = 4

function parseLine(line: string, repeat = false) {
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
        "h-14 border-l border-border/60 px-1 text-center align-middle text-lg font-semibold",
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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const songId = await params
  const results = await getSongFromId(songId.id)

  return (
    <div>
      <div className="relative flex max-h-30 w-full items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={JSON.parse(results.data?.cover as string).data.publicUrl}
          alt="cover"
          className="object-cover blur-xs grayscale-10"
        />

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 left-3 z-10 rounded-full bg-background/80 shadow-md backdrop-blur-sm"
        >
          <Link href="/songs" aria-label="Go back to songs">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{results.data?.name}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date(results.data?.created_at ?? "").toLocaleString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </p>
          </div>
          <Button aria-label="star" variant="ghost" size="icon">
            <StarIcon className="size-5 fill-yellow-300 text-yellow-300" />
          </Button>
        </div>
        <div className="flex h-12 w-full flex-col rounded-md bg-muted/50 p-2">
          <p className="text-xs text-muted-foreground">Scale</p>
          <p className="text-sm font-medium">{results.data?.scale}</p>
        </div>
        <div className="flex h-12 w-full flex-col rounded-md bg-muted/50 p-2">
          <p className="text-xs text-muted-foreground">Time Signature</p>
          <p className="text-sm font-medium">{results.data?.timesig}</p>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          {results.data?.chords?.map((section) => (
            <div key={section.id} className="flex flex-col gap-2">
              <div className="flex w-full flex-row items-center justify-between border-b pb-2">
                <div className="flex flex-col">
                  <p>{section.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <Link
                  href={`/editor?id=${results.data?.band}&name=${results.data?.name}&cover=${JSON.parse(results.data?.cover as string).data.publicUrl}`}
                >
                  <Button size="icon" variant="ghost" aria-label="edit">
                    <EditIcon className="size-4" />
                  </Button>
                </Link>
              </div>
              <div className="w-full overflow-hidden rounded-md">
                <table className="w-full table-fixed border-collapse">
                  <colgroup>
                    <col className="w-1/4" />
                    <col className="w-1/4" />
                    <col className="w-1/4" />
                    <col className="w-1/4" />
                  </colgroup>

                  <thead>
                    <tr className="border-b bg-muted/50 text-xs font-medium text-muted-foreground">
                      {[1, 2, 3, 4].map((n) => (
                        <th
                          key={n}
                          className="h-10 border-l border-border/60 px-1 text-center"
                        >
                          Beat {n}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {section.chords.map((chord) => (
                      <tr
                        key={chord.id}
                        className="border-b transition-colors hover:bg-muted/40"
                      >
                        {parseLine(chord.chord, chord.repeat)}
                      </tr>
                    ))}

                    {section.chords.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="h-24 text-center text-sm text-muted-foreground"
                        >
                          No lines yet. Add chords below.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
