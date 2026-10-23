import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  ArrowLeft,
  Mic,
  AudioWaveform,
  ChevronRightIcon,
  CircleArrowRight,
  Disc,
  Icon,
  SearchIcon,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import QuickPickSearchContainers from "@/components/QuickPickSearchContainers"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Search() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-background/70 py-2 backdrop-blur-md">
        <button className="p-1 text-zinc-400 transition-colors hover:text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex flex-1 items-center rounded-full bg-[#282828] px-4 py-2.5">
          <input
            type="text"
            placeholder="Search songs, albums, artists"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-400 outline-none"
          />
        </div>
        <button className="p-1 text-zinc-400 transition-colors hover:text-white">
          <Mic className="h-6 w-6" />
        </button>
      </section>
      <section className="flex flex-row items-center justify-around gap-2">
        <div className="flex h-20 w-28 items-center rounded-md bg-muted">
          <div className="flex flex-col gap-1 p-2">
            <Star size={28} color="yellow" fill="yellow" />
            <span className="text-sm font-semibold">Favourites</span>
          </div>
        </div>
        <div className="flex h-20 w-28 items-center rounded-md bg-muted">
          <div className="flex flex-col gap-1 p-2">
            <Disc size={28} className="text-purple-200" />
            <span className="text-sm font-semibold">PlayLists</span>
          </div>
        </div>
        <div className="flex h-20 w-28 items-center rounded-md bg-muted">
          <div className="flex flex-col gap-1 p-2">
            <AudioWaveform size={28} className="text-blue-400" />
            <span className="text-sm font-semibold">Songs</span>
          </div>
        </div>
      </section>
      <section className="flex max-w-full flex-col gap-4 overflow-y-auto">
        <QuickPickSearchContainers />
        <QuickPickSearchContainers />
        <QuickPickSearchContainers />
        <QuickPickSearchContainers />
        <QuickPickSearchContainers />
        <QuickPickSearchContainers />
      </section>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"></EmptyMedia>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Add data</Button>
        </EmptyContent>
      </Empty>

      <Button size="icon">
        <CircleArrowRight />
      </Button>
    </section>
  )
}
