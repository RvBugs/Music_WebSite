import { CardComponent } from "@/components/CardComponent"
import { Button } from "@/components/ui/button"
import QuickPickContainers from "@/components/QuickPickContainers"

export default function Page() {
  return (
    <div className="flex flex-col gap-8 py-8">

      <div className="flex flex-col justify-start gap-4 px-4 lg:px-16">
        <div className="flex flex-row items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cover.jpg" alt="cover" className="size-12 rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Rajinda Wanigasingha
            </span>
            <span className="text-lg font-medium">Quick Picks</span>
          </div>
        </div>

        <div className="grid w-full grid-cols-3 grid-rows-2 gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cover.jpg" alt="cover" className="col-span-1 rounded-md" />
          <img src="/cover.jpg" alt="cover" className="col-span-1 border-2 border-border rounded-md" />
          <img src="/cover.jpg" alt="cover" className="col-span-1 border-2 border-border rounded-md" />
          <img src="/cover.jpg" alt="cover" className="col-span-1 border-2 border-border rounded-md" />
          <img src="/cover.jpg" alt="cover" className="col-span-1 border-2 border-border rounded-md" />
          <img src="/cover.jpg" alt="cover" className="col-span-1 border-2 border-border rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-8 px-4 lg:px-16">

        <section className="flex flex-col gap-4">
          <span className="font-medium">Favourite PlayList</span>
          <div className="flex scrollbar-none flex-row gap-4 overflow-x-scroll">
            <CardComponent title={"Playlist"} description={"2026 playlist songs"} />
            <CardComponent title={"Playlist"} description={"2026 playlist songs"}/>
            <CardComponent title={"Playlist"} description={"2026 playlist songs"}/>
            <CardComponent title={"Playlist"} description={"2026 playlist songs"}/>
            <CardComponent title={"Playlist"} description={"2026 playlist songs"}/>
            <CardComponent title={"Playlist"} description={"2026 playlist songs"}/>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-medium">Favourite Songs</span>
          <div className="flex scrollbar-none flex-row gap-4 overflow-x-scroll">
            <div className="min-w-80">
              <QuickPickContainers />
              <QuickPickContainers />
              <QuickPickContainers />
              <QuickPickContainers />
            </div>
            <div className="min-w-80">
              <QuickPickContainers />
              <QuickPickContainers />
              <QuickPickContainers />
              <QuickPickContainers />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
