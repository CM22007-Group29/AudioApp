import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Upload', 'Edit', 'Download'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}
            sx={{"& .MuiStepLabel-root .Mui-completed": {color: "#f5f5f5"},
                "& .MuiStepLabel-root .Mui-active": {color: "#f5f5f5"},
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {fill: "black"}
            }}
          >
            <StepLabel>
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
         <Typography sx={{ mt: 2, mb: 1, color: '#f5f5f5' }}>
          All steps completed - you&apos;re finished
         </Typography>
         <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset} sx={{ color: '#f5f5f5'}}>Reset</Button>
         </Box>
        </React.Fragment>
    ) : (
      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit" 
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, color: '#f5f5f5' }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button 
            onClick={handleNext} 
            sx={{ mr: 1, color: '#f5f5f5'}}
            >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
      )}
    </Box>
  );
}
