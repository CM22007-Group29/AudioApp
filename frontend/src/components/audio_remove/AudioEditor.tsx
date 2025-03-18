import { Container, Stack } from "@mui/material"
import { AudioContextProvider } from "../AudioProvider"
import { Transport } from "../Transport"
import { Waveform } from "../Waveform"

function AudioEditor() {
    return (
      <Container sx={{ marginTop: 1 }}>
        <AudioContextProvider>
          <Stack direction="column" gap={2}>
            <Transport />
            <Waveform />
            {/* <ProgressBar /> */}
          </Stack>
        </AudioContextProvider>
      </Container>
    )
}
  
export default AudioEditor