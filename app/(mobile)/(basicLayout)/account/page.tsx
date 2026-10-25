import { Input } from "@/components/ui/input"
import { InputGroupText } from "@/components/ui/input-group"

export default function Account() {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg shadow-md bg-[#090B0C] pb-6">
      
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src="030ad49b2acdd4747498c35811bdeec6.jpg"
          alt="Cover Photo"
          className="h-full w-full object-cover"
        />
      </div>

     
      <div className="relative flex justify-center">
        <div className="absolute -translate-y-1/2">
          <img
            src="030ad49b2acdd4747498c35811bdeec6.jpg"
            alt="Profile Picture"
            className="h-42 w-42 rounded-full border-8 border-[#090B0C] object-cover shadow-lg"
          />
        </div>
      </div>

     {/* {/Details section} */}
      <div className="pt-24 px-6 bg">
        <div className="flex-col space-y-3">  
          <div className="bg-[#1F1E23] pt-2 px-4 pb-2 rounded-[20px]  ">
            <div className=" items-center">
             <h6 className="text-[#9E9DA3] font-light">Name</h6>
             <h4 className="text-white font-semibold">Wave Acoustic</h4>
            </div>
          </div>
          <div className="bg-[#1F1E23] pt-2 px-4 pb-2 rounded-[20px]  ">
            <div className="">
             <h6 className="text-[#9E9DA3] font-light">Name</h6>
             <h4 className="text-white font-semibold">Wave Acoustic</h4>
            </div>
          </div>
           <div className="bg-[#1F1E23] pt-2 px-4 pb-2 rounded-[20px]  ">
            <div className="flex-row">
             <h6 className="text-[#9E9DA3] font-light">Discription</h6>
             <h4 className="text-white font-semibold">band discription</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 px-6">
        <div className="items-center flex justify-center mb-4"><h1>Reset Your Password</h1></div>
        
        
      </div>
    </div>
  )
}