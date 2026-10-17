import { Button } from "@/components/ui/button"
import { PlayListCardComponent } from "@/components/PlayListCardComponent"

export default function Page() {
  return (
    <>
      <section>
        <span className="px-4 font-medium">Quick PlayList</span>
        <div className="flex flex-row gap-4 overflow-x-scroll p-4">
          <PlayListCardComponent />
          <PlayListCardComponent />
          <PlayListCardComponent />
        </div>
      </section>

      <section>
        <span className="px-4 font-medium">Quick Songs</span>
        <div className="flex flex-row gap-4 overflow-x-scroll p-4">
          <PlayListCardComponent />
          <PlayListCardComponent />
          <PlayListCardComponent />
        </div>
      </section>
    </>
  )
}
