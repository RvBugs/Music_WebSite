import { Plus } from "lucide-react"
import QuickPickContainers from "@/components/QuickPickContainers"
import CreatePlaylistContainer from "@/components/ui/CreatePlaylistContainer"


export default function Playlist() {
  return (
    <div className="flex flex-auto scrollbar-none flex-row overflow-x-scroll ">
      <div className="flex min-w-80 shrink-0 grow flex-col">
        <QuickPickContainers />
        <QuickPickContainers />
        <QuickPickContainers />
        <CreatePlaylistContainer />
      </div>
      <div className={"flex min-w-80 shrink-0 grow flex-col"}>
        <QuickPickContainers />
        <QuickPickContainers />
        <QuickPickContainers />
        <QuickPickContainers />
      </div>
      <div className={"flex min-w-80 shrink-0 grow flex-col"}>
        <QuickPickContainers />
        <QuickPickContainers />
        <QuickPickContainers />
        <QuickPickContainers />
      </div>
    </div>
  )
}
