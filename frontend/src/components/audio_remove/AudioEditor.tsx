import { Container } from "@mui/material"
import { AudioContextProvider } from "../AudioProvider"
import { Transport } from "../Transport"
import { ProgressBar } from "../ProgressBar"
import { Waveform } from "../Waveform"

function AudioEditor() {
    return (
      <Container sx={{ marginTop: 1 }}>
        <AudioContextProvider>
          <ProgressBar />
          <Transport />
          <Waveform />
        </AudioContextProvider>
      </Container>
    )
}
  
export default AudioEditor