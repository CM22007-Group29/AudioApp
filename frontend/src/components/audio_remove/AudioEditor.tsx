import { Container, Stack, Typography } from "@mui/material"
import { AudioContextProvider } from "../AudioProvider"
import { Transport } from "../Transport"
import { Waveform } from "../Waveform"

function AudioEditor() {
    return (
      <Container sx={{ marginTop: 1 }}>
          <Stack direction="column" gap={2}>
            <Transport />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
              Words can be removed by clicking on the mute symbol on the respective word on the waveform
            </Typography>
            <Waveform />
          </Stack>
      </Container>
    )
}
  
export default AudioEditor