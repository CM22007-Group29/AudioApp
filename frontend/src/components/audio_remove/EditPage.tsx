import SilenceLengthSlider from "./user_preferences/SilenceLengthSlider"
import SilenceThresholdSlider from "./user_preferences/SilenceThresholdSlider"
import NormalisationCheckbox from "./user_preferences/NormalisationCheckbox"
import Grid from '@mui/material/Grid2';

function EditPage() {
    return (
        <Grid container spacing={2} size={8} direction="column" 
            sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            }}
        >
            <SilenceThresholdSlider />
            <SilenceLengthSlider />
            <NormalisationCheckbox />
        </Grid>
    )
  }
  
  export default EditPage