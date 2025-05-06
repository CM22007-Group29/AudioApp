import * as React from "react";
import { Slider, TextField, Button, Typography, Paper, Box, Stack, Grid, Select, MenuItem, InputAdornment, Chip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SilenceLengthCheckbox from "./user_preferences/SilenceLengthCheckbox";
import ThresholdCheckbox from "./user_preferences/ThresholdCheckbox";
import NormalisationCheckbox from "./user_preferences/NormalisationCheckbox";
import AudioEditor from "./AudioEditor";
import { useAuth } from "../../context/AuthContext";

// Standardize Paper dimensions and styling
const paperStyle = { 
  p: 3, 
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: 320, // Uniform height
  display: 'flex',
  flexDirection: 'column'
};

function EditPage() {
  const { user } = useAuth();
  const userId = user?.id;
  if (!userId) throw new Error("User ID not found");

  const [silenceThreshold, setSilenceThreshold] = React.useState(-40);
  const [silenceLength, setSilenceLength] = React.useState(1.0);
  const [checkedNormalisation, setCheckedNormalisation] = React.useState(true);
  const [checkedThreshold, setCheckedThreshold] = React.useState(false);
  const [checkedSilenceLength, setCheckedSilenceLength] = React.useState(false);
  const [extraWords, setExtraWords] = React.useState("");
  const [hasPreferences, setHasPreferences] = React.useState(false);
  const [preferenceSaved, setPreferenceSaved] = React.useState(false);

  // For word chips management
  const [currentWord, setCurrentWord] = React.useState("");
  const [wordChips, setWordChips] = React.useState<string[]>([]);

  // For normalization level
  const [normalizationLevel, setNormalizationLevel] = React.useState("medium");

  React.useEffect(() => {
    fetch(`http://127.0.0.1:4040/api/users/${userId}/preferences`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          setHasPreferences(true);
          return res.json();
        }
        setHasPreferences(false);
      })
      .catch((error) => console.error("Error fetching preferences:", error));
  }, [userId]);

  React.useEffect(() => {
    // Parse existing extraWords into chips when component loads
    if (extraWords) {
      setWordChips(extraWords.split(/\s+/).filter(w => w.length > 0));
    }
  }, []);

  const handleSubmitPreferences = async () => {
    const finalThreshold = checkedThreshold ? null : silenceThreshold;
    const finalLength = checkedSilenceLength ? null : silenceLength;

    const payload = {
      silence_threshold: finalThreshold,
      silence_length: finalLength,
      normalise: checkedNormalisation,
      extra_words: extraWords,
    };

    try {
      const method = hasPreferences ? "PUT" : "POST";
      const response = await fetch(`http://127.0.0.1:4040/api/users/${userId}/preferences`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log("Preferences saved successfully");
        setPreferenceSaved(true);
        setTimeout(() => setPreferenceSaved(false), 3000);
      } else {
        console.error("Failed to save preferences");
        setPreferenceSaved(false);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      setPreferenceSaved(false);
    }
  };

  // Add word to chips
  const handleAddWord = () => {
    if (currentWord.trim()) {
      const newChips = [...wordChips, currentWord.trim()];
      setWordChips(newChips);
      setExtraWords(newChips.join(" "));
      setCurrentWord("");
    }
  };

  // Remove word from chips
  const handleDeleteChip = (chipToDelete: string) => {
    const filteredChips = wordChips.filter(chip => chip !== chipToDelete);
    setWordChips(filteredChips);
    setExtraWords(filteredChips.join(" "));
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      minHeight: "100vh", 
      backgroundColor: "#2b2b2b",
      paddingBottom: 6,
    }}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
          mt: 4,
          borderRadius: "12px",
        }}
      >
        <AudioEditor />
      </Box>

      <Typography variant="h5" sx={{ color: "white", mb: 3, fontWeight: "medium" }}>
        Audio Processing Preferences
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1200, px: 2 }}>
        {/* Silence Threshold */}
        <Grid xs={12} md={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Silence Threshold
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ThresholdCheckbox
                check_threshold={checkedThreshold}
                setCheckThreshold={setCheckedThreshold}
              />
              <Typography sx={{ ml: 1, color: "white" }}>
                Use default (-40dB)
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Typography sx={{ color: "white", width: 30 }}>-60</Typography>
                <Slider
                  min={-60}
                  max={-10}
                  step={1}
                  value={silenceThreshold}
                  onChange={(_, newValue) => setSilenceThreshold(newValue as number)}
                  disabled={checkedThreshold}
                  marks={[
                    { value: -60, label: '' },
                    { value: -50, label: '' },
                    { value: -40, label: '' },
                    { value: -30, label: '' },
                    { value: -20, label: '' },
                    { value: -10, label: '' },
                  ]}
                  sx={{
                    '& .MuiSlider-track': { backgroundColor: 'white' },
                    '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.3)' },
                    '& .MuiSlider-thumb': { backgroundColor: 'white' },
                    '& .MuiSlider-mark': { backgroundColor: 'white', height: 4 }
                  }}
                />
                <Typography sx={{ color: "white", width: 30 }}>-10</Typography>
                <TextField
                  variant="outlined"
                  value={silenceThreshold}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= -60 && value <= -10) {
                      setSilenceThreshold(value);
                    }
                  }}
                  disabled={checkedThreshold}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">dB</InputAdornment>,
                  }}
                  sx={{
                    width: 140,
                    input: { color: "white", textAlign: "right", paddingRight: 1 },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    }
                  }}
                />
              </Stack>
            </Box>
            
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                <strong>Less sensitive (-10dB)</strong>: Removes more audio including softer sounds
                <br/>
                <strong>More sensitive (-60dB)</strong>: Only removes very quiet sections
                <br/>
                Default value (-40dB) works well for most recordings.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Silence Length */}
        <Grid xs={12} md={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Silence Length
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <SilenceLengthCheckbox
                check_silenceLength={checkedSilenceLength}
                setCheckSilenceLength={setCheckedSilenceLength}
              />
              <Typography sx={{ ml: 1, color: "white" }}>
                Use default (1sec)
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Typography sx={{ color: "white", width: 30 }}>0.1</Typography>
                <Slider
                  min={0.1}
                  max={3.0}
                  step={0.1}
                  value={silenceLength}
                  onChange={(_, newValue) => setSilenceLength(newValue as number)}
                  disabled={checkedSilenceLength}
                  marks={[
                    { value: 0.5, label: '' },
                    { value: 1.0, label: '' },
                    { value: 1.5, label: '' },
                    { value: 2.0, label: '' },
                    { value: 2.5, label: '' },
                  ]}
                  sx={{
                    '& .MuiSlider-track': { backgroundColor: 'white' },
                    '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.3)' },
                    '& .MuiSlider-thumb': { backgroundColor: 'white' },
                    '& .MuiSlider-mark': { backgroundColor: 'white', height: 4 }
                  }}
                />
                <Typography sx={{ color: "white", width: 30 }}>3.0</Typography>
                <TextField
                  variant="outlined"
                  value={silenceLength}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0.1 && value <= 3.0) {
                      setSilenceLength(value);
                    }
                  }}
                  disabled={checkedSilenceLength}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                  }}
                  sx={{
                    width: 140,
                    input: { color: "white", textAlign: "right", paddingRight: 1 },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    }
                  }}
                />
              </Stack>
            </Box>
            
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                <strong>Shorter (0.1sec)</strong>: Removes brief pauses, creating faster pacing
                <br/>
                <strong>Longer (3.0sec)</strong>: Only removes extended silences
                <br/>
                Default value (1.0sec) provides natural-sounding results.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Normalisation */}
        <Grid xs={12} md={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Normalisation
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <NormalisationCheckbox
                check_normalisation={checkedNormalisation}
                setCheckNormalisation={setCheckedNormalisation}
              />
              <Typography sx={{ ml: 1, color: "white" }}>
                {checkedNormalisation ? "Enabled" : "Disabled"}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: "white", mb: 1 }}>Normalization Level:</Typography>
              <Select
                value={normalizationLevel}
                onChange={(e) => setNormalizationLevel(e.target.value)}
                disabled={!checkedNormalisation}
                fullWidth
                sx={{
                  color: "white",
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value="light">Light (±3dB adjustment)</MenuItem>
                <MenuItem value="medium">Medium (±6dB adjustment)</MenuItem>
                <MenuItem value="strong">Strong (±9dB adjustment)</MenuItem>
              </Select>
            </Box>
            
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                <strong>Light</strong>: Subtle adjustment, preserves dynamic range
                <br/>
                <strong>Medium</strong>: Balanced adjustment for most recordings
                <br/>
                <strong>Strong</strong>: Maximum consistency, less dynamic range
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Extra Words */}
        <Grid xs={12} md={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Extra Words to Remove
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Type a word to remove"
                value={currentWord}
                onChange={(e) => setCurrentWord(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
                sx={{
                  flex: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                  }
                }}
              />
              <Button 
                variant="contained"
                onClick={handleAddWord}
                disabled={!currentWord.trim()}
                sx={{ ml: 1, minWidth: 'auto', bgcolor: 'white', color: 'black' }}
              >
                <AddIcon />
              </Button>
            </Box>
            
            <Box sx={{ 
              mb: 2, 
              display: 'flex', 
              flexWrap: 'wrap', 
              maxHeight: 100, 
              overflowY: 'auto',
              border: wordChips.length ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              borderRadius: 1,
              p: wordChips.length ? 1 : 0
            }}>
              {wordChips.map((word, index) => (
                <Chip
                  key={index}
                  label={word}
                  onDelete={() => handleDeleteChip(word)}
                  sx={{ 
                    m: 0.5, 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    color: 'white',
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { color: 'white' }
                    }
                  }}
                />
              ))}
              {!wordChips.length && (
                <Typography variant="body2" sx={{ color: '#999', p: 1 }}>
                  No words added yet
                </Typography>
              )}
            </Box>
            
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                Add custom words you want removed from your audio.
                Common filler words: "um", "uh", "like", "you know", "actually"
                The system already removes common expletives by default.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Save Button and confirmation */}
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSubmitPreferences}
          size="large"
          sx={{
            px: 4,
            py: 1,
            backgroundColor: "white",
            color: "black",
            "&:hover": { backgroundColor: "#f0f0f0" },
            borderRadius: 2,
            mb: 2
          }}
        >
          Save Preferences
        </Button>
        
        {preferenceSaved && (
          <Box sx={{ 
            color: "#4caf50", 
            fontWeight: "bold",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
            borderRadius: 1,
            px: 3,
            py: 1,
            mt: 2
          }}>
            Preferences saved successfully!
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EditPage;
