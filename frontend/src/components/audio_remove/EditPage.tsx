import NormalisationCheckbox from "./user_preferences/Checkboxes"
import SilenceSlider from "./user_preferences/Sliders"
import { Stack } from "@mui/material"

function EditPage() {
    return (
        <>
        <Stack spacing={4} className="flex flex-col items-center justify-center">
            <div className="text-center mx-auto pt-5">
                <h1 className="text-gray-900 text-balance text-white font-bold text-3xl md:text-4xl xl:text-5xl">Edit Page</h1>
            </div>
            <SilenceSlider /> 
            <NormalisationCheckbox />
        </Stack>
        </>
    )
  }
  
  export default EditPage