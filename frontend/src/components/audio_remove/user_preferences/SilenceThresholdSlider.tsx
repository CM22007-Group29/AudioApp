import Slider from '@mui/material/Slider';

interface SilenceThresholdSliderProps {
  silence_threshold: number;
  setSilenceThreshold: (value: number) => void;
  disabled?: boolean;
}

export default function SilenceThresholdSlider({ silence_threshold, setSilenceThreshold, disabled = false }: SilenceThresholdSliderProps) {

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSilenceThreshold(newValue);
    }
  };

  return (
        <Slider 
          aria-label="Silence threshold"
          value={silence_threshold}
          onChange={handleChange} 
          valueLabelDisplay="auto"
          sx={{ color: 'white' }}
          disabled={disabled}
        />
  );
}