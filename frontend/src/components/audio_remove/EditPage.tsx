import * as React from 'react';
import SilenceLengthSlider from "./user_preferences/SilenceLengthSlider"
import SilenceThresholdSlider from "./user_preferences/SilenceThresholdSlider"
import NormalisationCheckbox from "./user_preferences/NormalisationCheckbox"
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

function EditPage() {
    const [silenceThreshold, setSilenceThreshold] = React.useState(50);
    const [silenceLength, setSilenceLength] = React.useState(50);
    const [checkedNormalisation, setCheckedNormalisation] = React.useState(true);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={4}>
                <p className="text-black" style={{ minWidth: '40px', textAlign: 'center' }}>Silence Threshold</p>
            </Grid>

            <Grid size={4}>
                <SilenceThresholdSlider 
                    silence_threshold={silenceThreshold} 
                    setSilenceThreshold={setSilenceThreshold} 
                />
            </Grid>

            <Grid size={4}>
                <p className="text-black" style={{ minWidth: '40px', textAlign: 'center' }}>{silenceThreshold}</p>
            </Grid>

            <Grid size={4}>
                <p className="text-black" style={{ minWidth: '40px', textAlign: 'center' }}>Silence Length</p>
            </Grid>

            <Grid size={4}>
                <SilenceLengthSlider 
                    silence_length={silenceLength}
                    setSilenceLength={setSilenceLength} 
                />
            </Grid>

            <Grid size={4}>
                <p className="text-black" style={{ minWidth: '40px', textAlign: 'center' }}>{silenceLength}</p>
            </Grid>

            <Grid size={4}>
                <p className="text-black" style={{ minWidth: '40px', textAlign: 'center' }}>Normalisation</p>
            </Grid>
            <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NormalisationCheckbox 
                    check_normalisation={checkedNormalisation}
                    setCheckNormalisation={setCheckedNormalisation}
                />
            </Grid>
            <Grid size={4}>
                <p className="text-black" style={{ minWidth: '40px', textAlign: 'center' }}>{checkedNormalisation ? "On" : "Off" }</p>
            </Grid>
        </Grid>
        </Box>
    )
  }
  
  export default EditPage;