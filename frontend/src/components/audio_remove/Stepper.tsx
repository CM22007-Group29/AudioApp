import { useState } from "react"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileUpload from './FileUpload';
import EditPage from './EditPage';
import Download from './Download';
import { Stack } from "@mui/material"

const steps = ['Upload', 'Edit', 'Download'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleNext = () => {
    if (activeStep === 0 && !fileUploaded) return
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setFileUploaded(false)
  }

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
      <Box>
        {{
          0:<FileUpload setFileUploaded={setFileUploaded} />,
          1:<EditPage />,
          2:<Download />,
        }[activeStep]}
      </Box>
      {activeStep === steps.length ? (
        <Stack>
         <Typography sx={{ mt: 2, mb: 1, color: '#f5f5f5' }}>
          All steps completed - you&apos;re finished
         </Typography>
         <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset} sx={{ color: '#f5f5f5', mr: 10}}>Reset</Button>
          </Box>
        </Stack>
    ) : (
      <Stack 
        direction="row"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
          <Button
            color="inherit" 
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ ml: 10, color: '#f5f5f5' }}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={activeStep === 0 && !fileUploaded}
            sx={{ mr: 10, color: '#f5f5f5' }}
            >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
      </Stack>
      )}
    </Box>
  )
}
