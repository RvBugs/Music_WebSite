import Empty from "./empty"
import { load } from "@/app/(mobile)/(basicLayout)/songs/load"
import HeaderSongs from "@/app/(mobile)/(basicLayout)/songs/header"
import SongsCards from "@/app/(mobile)/(basicLayout)/songs/songsCards"

export default async function Page() {

  const data = await load()

  console.log("hnbgjnvghnvnb", data);

  const renderData = () => {
    switch (data.type) {
      case "success" : {
        return <div>{data.data !== null && data.data !== undefined ? <SongsCards songs={data.data} /> : null}</div>
      }

      case "songNotFound": {
        return <Empty />
      }

      default : {
        return <Empty />
      }
    }
  }

  return (
    <div className="h-screen">
      <HeaderSongs />
      {renderData()}
    </div>
  )
}
