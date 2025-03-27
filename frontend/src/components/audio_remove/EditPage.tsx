import * as React from 'react';
import SilenceLengthSlider from "./user_preferences/SilenceLengthSlider";
import SilenceThresholdSlider from "./user_preferences/SilenceThresholdSlider";
import NormalisationCheckbox from "./user_preferences/NormalisationCheckbox";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function EditPage() {
  const [silenceThreshold, setSilenceThreshold] = React.useState(50);
  const [silenceLength, setSilenceLength] = React.useState(50);
  const [checkedNormalisation, setCheckedNormalisation] = React.useState(true);
  const [extraWords, setExtraWords] = React.useState("");

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Silence Threshold */}
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            Silence Threshold
          </p>
        </Grid>
        <Grid size={4}>
          <SilenceThresholdSlider 
            silence_threshold={silenceThreshold} 
            setSilenceThreshold={setSilenceThreshold}
          />
        </Grid>
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            {silenceThreshold}
          </p>
        </Grid>
        {/* Silence Length */}
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            Silence Length
          </p>
        </Grid>
        <Grid size={4}>
          <SilenceLengthSlider 
            silence_length={silenceLength}
            setSilenceLength={setSilenceLength} 
          />
        </Grid>
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            {silenceLength}
          </p>
        </Grid>
        {/* Normalisation */}
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            Normalisation
          </p>
        </Grid>
        <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <NormalisationCheckbox 
            check_normalisation={checkedNormalisation}
            setCheckNormalisation={setCheckedNormalisation}
          />
        </Grid>
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            {checkedNormalisation ? "On" : "Off" }
          </p>
        </Grid>
        {/* Extra Words */}
        <Grid size={4}>
          <p style={{ minWidth: '40px', textAlign: 'center', color: 'white' }}>
            Extra Words
          </p>
        </Grid>
        <Grid size={8}>
          <TextField
            variant="outlined"
            label="Enter extra words to remove"
            value={extraWords}
            onChange={(e) => setExtraWords(e.target.value)}
            // Remove fullWidth if you want a smaller width and override via sx
            sx={{
              width: 400,
              minWidth: 300,
              input: { color: 'white' },
              '& .MuiInputLabel-root': { color: 'white' }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditPage;