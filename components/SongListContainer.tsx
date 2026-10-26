import { Plus } from "lucide-react"
import QuickPickContainers from "@/components/QuickPickContainers"
import CreateNewButtonTop from "@/components/CreateNewButtonTop"

export default function Playlist() {
  return (
    <div>
      <CreateNewButtonTop containerType={"Songs"} />

      <div className="flex flex-auto scrollbar-none flex-row overflow-x-scroll">
        <div className="flex min-w-80 shrink-0 grow flex-col">
          <QuickPickContainers propstype="Song" details="Song 1" />
          <QuickPickContainers propstype="Song" details="Song 2" />
          <QuickPickContainers propstype="Song" details="Song 3" />
          <QuickPickContainers propstype="Song" details="Song 4" />
        </div>

        <div className="flex min-w-80 shrink-0 grow flex-col">
          <QuickPickContainers propstype="Song" details="Song 5" />
          <QuickPickContainers propstype="Song" details="Song 6" />
          <QuickPickContainers propstype="Song" details="Song 7" />
          <QuickPickContainers propstype="Song" details="Song 8" />
        </div>

        <div className="flex min-w-80 shrink-0 grow flex-col">
          <QuickPickContainers propstype="Song" details="Song 9" />
          <QuickPickContainers propstype="Song" details="Song 10" />
          <QuickPickContainers propstype="Song" details="Song 11" />
          <QuickPickContainers propstype="Song" details="Song 12" />
        </div>
      </div>
    </div>
  )
}
