import HorizontalLinearStepper from "./Stepper"


function GetStarted() {
    return (
      <>
        <div className="relative h-screen bg-radial from-[#383838] to-[#262626]">
          <div className="relative pt-16 ml-auto">
            <HorizontalLinearStepper />
          </div>
        </div>
      </>
    )
  }
  
  export default GetStarted