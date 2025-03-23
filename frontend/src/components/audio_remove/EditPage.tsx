import * as React from 'react';
import SilenceLengthSlider from "./user_preferences/SilenceLengthSlider"
import SilenceThresholdSlider from "./user_preferences/SilenceThresholdSlider"
import NormalisationCheckbox from "./user_preferences/NormalisationCheckbox"
import Grid from '@mui/material/Grid2';
import Item from '@mui/material/Item';

function EditPage() {
    const [silenceThreshold, setSilenceThreshold] = React.useState(50);
    const [silenceLength, setSilenceLength] = React.useState(50);
    const [checkedNormalisation, setCheckedNormalisation] = React.useState(true);

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={4}>
                <p className="text-black">Silence Threshold</p>
            </Grid>

            <Grid size={4}>
                <SilenceThresholdSlider 
                    silence_threshold={silenceThreshold} 
                    setSilenceThreshold={setSilenceThreshold} 
                />
            </Grid>

            <Grid size={4}>
                <p className="text-black">{silenceThreshold}</p>
            </Grid>

            <Grid size={4}>
                <p className="text-black">Silence Length</p>
            </Grid>

            <Grid size={4}>
                <SilenceLengthSlider 
                    silence_length={silenceLength}
                    setSilenceLength={setSilenceLength} 
                />
            </Grid>

            <Grid size={4}>
                <p className="text-black">{silenceLength}</p>
            </Grid>

            <Grid size={4}>
                <p className="text-black">Normalisation</p>
            </Grid>
            <Grid size={4}>
                <NormalisationCheckbox 
                    check_normalisation={checkedNormalisation}
                    setCheckNormalisation={setCheckedNormalisation}
                />
            </Grid>
            <Grid size={4}>
                <p className="text-black">{checkedNormalisation ? "On" : "Off" }</p>
            </Grid>
        </Grid>
        // <Grid container spacing={2} size={8} direction="column" 
        //     sx={{
        //     justifyContent: "flex-start",
        //     alignItems: "center",
        //     }}
        // >
        //     <SilenceThresholdSlider />
        //     <SilenceLengthSlider />
        //     <NormalisationCheckbox />
        // </Grid>
    )
  }
  
  export default EditPage;