import { Container } from "@mui/material"
import { AudioContextProvider } from "../AudioProvider"
import { Transport } from "../Transport"
import { ProgressBar } from "../ProgressBar"

function AudioEditor() {
    return (
      <Container sx={{ marginTop: 1 }}>
        <AudioContextProvider>
          <ProgressBar />
          <Transport />
        </AudioContextProvider>
      </Container>
    )
}
  
export default AudioEditor