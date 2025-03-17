import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function NormalisationCheckbox() {
    // Create and set default value
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Box sx={{ width: 400 }}>
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                <p className="text-white">Normalisation</p>
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
                <p className="text-white">{checked ? "On" : "Off" }</p>
            </Stack>
        </Box>
  );
}