import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

// Define the props type
interface NormalisationCheckboxProps {
  check_normalisation: boolean;
  setCheckNormalisation: (value: boolean) => void;
}

export default function NormalisationCheckbox({
  check_normalisation,
  setCheckNormalisation,
}: NormalisationCheckboxProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNormalisation(event.target.checked);
  };

  return (
    <Checkbox
      {...label}
      checked={check_normalisation}
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