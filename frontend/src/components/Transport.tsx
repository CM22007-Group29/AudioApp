import { useAudioContext } from "./AudioProvider";
import { Button, Stack } from "@mui/material";

export const Transport = () => {
  const audio = useAudioContext()

  const play = () => {
    audio?.audioRef.current?.play()
  }

  const pause = () => {
    audio?.audioRef.current?.pause()
  }

  return (
    <Stack spacing={2} direction="row">
      <Button onClick={play} variant="contained">
        Play
      </Button>
      <Button onClick={pause} variant="contained">
        Pause
      </Button>
    </Stack>
  )
}