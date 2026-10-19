import { Plus } from "lucide-react"
import QuickPickContainers from "@/components/QuickPickContainers"
import CreateNewButtonTop from "@/components/CreateNewButtonTop"


export default function Playlist() {
  return (
    <div>
      <CreateNewButtonTop containerType={"Playlist"} />
      <div className="flex flex-auto scrollbar-none flex-row overflow-x-scroll">
        <div className="flex min-w-80 shrink-0 grow flex-col">
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
        </div>
        <div className={"flex min-w-80 shrink-0 grow flex-col"}>
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
        </div>
        <div className={"flex min-w-80 shrink-0 grow flex-col"}>
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
          <QuickPickContainers
            propstype={"Playlist"}
            details={"12 or more songs"}
          />
        </div>
      </div>
    </div>
  )
}
