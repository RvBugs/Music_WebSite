import { Button } from "@/components/ui/button"
import { Plus, MoreVertical } from "lucide-react"

type ContainerTypeButton = {
  containerType: string
}
export default function CreateNewButtonTop({containerType,}:ContainerTypeButton) {
  return (
    <>
      {/* Desktop version: visible on screens 640px and larger */}
      <div className="mt-5 mr-10 ml-3 hidden flex-row items-center justify-between sm:flex">
        <span>Your {containerType}</span>
        <Button className="h-16 w-33">
          <Plus className="size-7" />
          New {containerType}
        </Button>
      </div>
    </>
  )
}