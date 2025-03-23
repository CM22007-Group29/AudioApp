import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function NormalisationCheckbox({ check_normalisation, setCheckNormalisation }) {

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
                    color: "black",
                },
            }}
        />
    );
}