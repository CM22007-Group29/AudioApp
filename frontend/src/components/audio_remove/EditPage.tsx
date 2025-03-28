import * as React from "react";
import SilenceLengthSlider from "./user_preferences/SilenceLengthSlider";
import SilenceThresholdSlider from "./user_preferences/SilenceThresholdSlider";
import NormalisationCheckbox from "./user_preferences/NormalisationCheckbox";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AudioEditor from "./AudioEditor";
import { useAuth } from "../../context/AuthContext";
import SilenceLengthCheckbox from "./user_preferences/SilenceLengthCheckbox";
import ThresholdCheckbox from "./user_preferences/ThresholdCheckbox";

function EditPage() {
  const { user } = useAuth();
  const userId = user?.id;
  if (!userId) throw new Error("User ID not found");

  const [silenceThreshold, setSilenceThreshold] = React.useState(50);
  const [silenceLength, setSilenceLength] = React.useState(50);
  const [checkedNormalisation, setCheckedNormalisation] = React.useState(true);
  // For these checkboxes, true means "use default" (null) so slider disabled
  const [checkedThreshold, setCheckedThreshold] = React.useState(false);
  const [checkedSilenceLength, setCheckedSilenceLength] = React.useState(false);
  const [extraWords, setExtraWords] = React.useState("");
  const [hasPreferences, setHasPreferences] = React.useState(false);

  // Fetch preferences on mount
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

  const handleSubmitPreferences = async () => {
    // If the checkbox is ticked, we use default (null) for that value.
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
      } else {
        console.error("Failed to save preferences");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "50vh" }}>
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

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Silence Threshold */}
        <Grid size={3}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>
            Silence Threshold
          </p>
        </Grid>
        <Grid size={1}>
          <ThresholdCheckbox
            check_threshold={checkedThreshold}
            setCheckThreshold={setCheckedThreshold}
          />
        </Grid>
        <Grid size={4}>
          <SilenceThresholdSlider
            silence_threshold={silenceThreshold}
            setSilenceThreshold={setSilenceThreshold}
            disabled={checkedThreshold}
          />
        </Grid>
        <Grid size={4}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>
            {checkedThreshold ? "Default" : silenceThreshold}
          </p>
        </Grid>
        {/* Silence Length */}
        <Grid size={3}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>
            Silence Length
          </p>
        </Grid>
        <Grid size={1}>
          <SilenceLengthCheckbox
            check_silenceLength={checkedSilenceLength}
            setCheckSilenceLength={setCheckedSilenceLength}
          />
        </Grid>
        <Grid size={4}>
          <SilenceLengthSlider
            silence_length={silenceLength}
            setSilenceLength={setSilenceLength}
            disabled={checkedSilenceLength}
          />
        </Grid>
        <Grid size={4}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>
            {checkedSilenceLength ? "Default" : silenceLength}
          </p>
        </Grid>
        {/* Normalisation */}
        <Grid size={3}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>
            Normalisation
          </p>
        </Grid>
        <Grid size={1}>
          {/* Alignment cell */}
        </Grid>
        <Grid
          size={4}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <NormalisationCheckbox
            check_normalisation={checkedNormalisation}
            setCheckNormalisation={setCheckedNormalisation}
          />
        </Grid>
        <Grid size={4}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>
            {checkedNormalisation ? "On" : "Off"}
          </p>
        </Grid>
        {/* Extra Words */}
        <Grid size={3}>
          <p style={{ minWidth: "40px", textAlign: "center", color: "white" }}>Extra Words</p>
        </Grid>
        <Grid size={1}>
          {/* Alignment cell */}
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            label="Enter extra words to remove"
            value={extraWords}
            onChange={(e) => setExtraWords(e.target.value)}
            sx={{ width: 500, input: { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }}
          />
        </Grid>
        <Grid size={4}>
          {/* Alignment cell */}
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleSubmitPreferences}
        sx={{
          mt: 2,
          backgroundColor: "white",
          color: "black",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
      >
        Save Preferences
      </Button>
    </Box>
  );
}

export default EditPage;
