import { AudioContextProvider } from "../AudioProvider"
import { Transport } from "../Transport"

function GetStarted() {
    return (
      <>
        <div className="relative h-screen bg-radial from-[#383838] to-[#262626]">
          <div className="relative pt-16 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900 text-balance dark:text-white font-bold text-3xl md:text-4xl xl:text-5xl">What are we editing today?</h1>
            </div>
            <AudioContextProvider>
              <Transport />
            </AudioContextProvider>
          </div>
        </div>
      </>
    )
  }
  
  export default GetStarted