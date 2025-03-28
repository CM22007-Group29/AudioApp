import Slider from '@mui/material/Slider';

interface SilenceLengthSliderProps {
  silence_length: number;
  setSilenceLength: (value: number) => void;
}

export default function SilenceLengthSlider({
  silence_length,
  setSilenceLength,
}: SilenceLengthSliderProps) {

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSilenceLength(newValue);
    }
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