import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

// Define the props type
interface ThresholdProps {
  check_threshold: boolean;
  setCheckThreshold: (value: boolean) => void;
}

export default function ThresholdCheckbox({
  check_threshold,
  setCheckThreshold,
}: ThresholdProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckThreshold(event.target.checked);
  };

  return (
    <Checkbox
      {...label}
      checked={check_threshold}
      onChange={handleChange}
      sx={{
        color: "gray",
        '&.Mui-checked': {
          color: "white",
        },
      }}
    />
  );
}