import Slider from '@mui/material/Slider';

export default function SilenceLengthSlider({ silence_length, setSilenceLength }) {

  const handleChange = (event, newValue) => {
    setSilenceLength(newValue);
  };

  return (
        <Slider 
          aria-label="Silence threshold"
          value={silence_length}
          onChange={handleChange} 
          valueLabelDisplay="auto"
          sx={{ color: 'black' }}
        />
  );
}