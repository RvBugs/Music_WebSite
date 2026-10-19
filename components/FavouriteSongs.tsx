import { CardComponent } from "@/components/CardComponent"

export default function FavouritePlayList() {
  return (
    <div>
      <div className="flex flex-col gap-4 px-3 lg:px-3">
        <section className="flex flex-col gap-4">
          <br />
          <span className="font-medium">Favourite Songs</span>

          <div className="flex scrollbar-none flex-row gap-3 overflow-x-scroll hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-transparent">
            <CardComponent title="Song 1" description="Song Author" />
            <CardComponent title="Song 2" description="Song Author" />
            <CardComponent title="Song 3" description="Song Author" />
            <CardComponent title="Song 4" description="Song Author" />
            <CardComponent title="Song 5" description="Song Author" />
            <CardComponent title="Song 6" description="Song Author" />
          </div>
        </section>
      </div>
    </div>
  )
}
