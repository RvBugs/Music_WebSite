import { CardComponent } from "@/components/CardComponent"
import { Button } from "@/components/ui/button"
import QuickPickContainers from "@/components/QuickPickContainers"
import { createClient } from "@/lib/supabase/server"
import logoutAction from "@/app/(mobile)/(basicLayout)/logout-action"
import Logout from "@/app/(mobile)/(basicLayout)/logout"

export default async function Page() {

  const supabase = await createClient()

  const data = await supabase.auth.getUser()

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col justify-start gap-4 px-4 lg:px-16">
        <div className="flex flex-row items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cover.jpg" alt="cover" className="size-12 rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {data.data.user?.email}
            </span>
            <span className="text-sm font-medium">Quick Picks</span>
          </div>
        </div>

        <Logout />

         <div className="grid w-full grid-cols-3 grid-rows-2 gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/06c1f1b9752dde1407d0bbb6e37f5bcc.jpg"
            alt="cover"
            className="col-span-1 aspect-square rounded-md object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/b206258a9bec6654038de9c3c78e9892.jpg"
            alt="cover"
            className="col-span-1 aspect-square rounded-md object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/59e4b33f8f6e7d2e3805ee75e8e6e0ae.jpg"
            alt="cover"
            className="col-span-1 aspect-square rounded-md object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/356a66f7e0b35a47d9ec398adbb870bc.jpg"
            alt="cover"
            className="col-span-1 aspect-square rounded-md object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/044532f1a427964c90ef86729d71399d.jpg"
            alt="cover"
            className="col-span-1 aspect-square rounded-md object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/94caf6136a3014cd173fca6ffd439c63.jpg"
            alt="cover"
            className="col-span-1 aspect-square rounded-md object-cover"
          />
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
