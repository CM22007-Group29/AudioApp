import Slider from '@mui/material/Slider';

export default function SilenceThresholdSlider({ silence_threshold, setSilenceThreshold }) {

  const handleChange = (event, newValue) => {
    setSilenceThreshold(newValue);
  };

  return (
        <Slider 
          aria-label="Silence threshold"
          value={silence_threshold}
          onChange={handleChange} 
          valueLabelDisplay="auto"
          sx={{ color: 'black' }}
        />
  );
}