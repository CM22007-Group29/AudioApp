import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

// Define the props type
interface SilenceLengthCheckboxProps {
  check_silenceLength: boolean;
  setCheckSilenceLength: (value: boolean) => void;
}

export default function SilenceLengthCheckbox({
  check_silenceLength,
  setCheckSilenceLength,
}: SilenceLengthCheckboxProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckSilenceLength(event.target.checked);
  };

  return (
    <Checkbox
      {...label}
      checked={check_silenceLength}
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