import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type ContainerTypeButton = {
  containerType: string
}

export default function CreateNewButtonBottom({ containerType, }: ContainerTypeButton) {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex h-74 w-34 items-center text-white shadow-lg transition-transform sm:hidden">
      <div className="flex">
        <Button className="h-16 w-33">
          <div className="flex w-full flex-row items-center justify-center">
            <Plus className="size-7" />
            New {containerType}
          </div>
        </Button>
      </div>
    </div>
  )
}