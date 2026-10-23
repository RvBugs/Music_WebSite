import { Input } from "@/components/ui/input"
import { div } from "motion/react-client"

export default function Account() {
  return (
    <div>
      <div class="relative mx-auto w-full max-w-2xl overflow-hidden rounded-lg shadow-md">
        <div class="relative h-48 w-full pb-14">
          <img
            src="030ad49b2acdd4747498c35811bdeec6.jpg"
            alt="Cover Photo"
            class="h-full w-full object-cover"
          />

          <div class="absolute bottom-0 left-1/2 translate-y-1/4 -translate-x-1/2">
            <img
              src="030ad49b2acdd4747498c35811bdeec6.jpg"
              alt="Profile Picture"
              class="h-32 w-32 rounded-full border-8 border-[#090B0C] object-cover shadow-lg"
            />
          </div>
        </div>

        <div class="px-6 pt-16 pb-6">
          
        </div>
      </div>
    </div>
  )
}
