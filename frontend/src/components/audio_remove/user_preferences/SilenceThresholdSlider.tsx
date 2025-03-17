import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function SilenceThresholdSlider() {
  // Create and set default value for slider
  const [value, setValue] = React.useState<number>(50);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 400 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <p className="text-white">Silence Threshold</p>
        <Slider 
          aria-label="Silence threshold"
          value={value} 
          onChange={handleChange} 
          valueLabelDisplay="auto"
          sx={(t) => ({
            color: 'white'
          })}
        />
        <p className="text-white">{value}</p>
      </Stack>
    </Box>
  );
}