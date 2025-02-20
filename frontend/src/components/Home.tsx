import { Button } from "@mui/material"
import {Link} from "react-router-dom"


function Home() {
  return (
    <>
      <div className="relative h-screen bg-radial from-[#383838] to-[#262626]">
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 text-balance dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Edit your audio with a click of a <span className="text-primary dark:text-white">button.</span></h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">Remove filler words and profanities from your audio file using <strong>AI</strong>.</p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <Button component={Link} to="/get-started" variant="contained" sx={{ backgroundColor: "#f2f2f2", color: 'black', borderRadius: 28}}>Get Started</Button>
              <Button component={Link} to="/features" variant="contained" sx={{ backgroundColor: "#2e2e2e", color: 'white', borderRadius: 28}} className="rounded-full">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home