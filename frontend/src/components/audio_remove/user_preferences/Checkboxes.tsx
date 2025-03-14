import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function NormalisationCheckbox() {
    // Create and set default value
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
        <Checkbox 
            {...label} 
            defaultChecked
            checked={checked}
            onChange={handleChange}
            sx={{
                color: "gray",
                '&.Mui-checked': {
                color: "white",
                },
            }} />
            <p className="text-white">Checkbox is {checked ? "on" : "off" }</p>
        </div>
  );
}