import { PlayListCardComponent } from "@/components/PlayListCardComponent"

export default function FavouritePlayList() {
  return (
    <div>
      <div className="flex flex-col gap-4 px-3 lg:px-3">
        <section className="flex flex-col gap-4">
          <br />
          <span className="font-medium">Favourite PlayList</span>
          <div className="flex scrollbar-none flex-row gap-3 overflow-x-scroll hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-transparent">
            <PlayListCardComponent />
            <PlayListCardComponent />
            <PlayListCardComponent />
            <PlayListCardComponent />
            <PlayListCardComponent />
            <PlayListCardComponent />
          </div>
        </section>
      </div>
    </div>
  )
}