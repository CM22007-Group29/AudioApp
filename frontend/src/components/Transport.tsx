import { useAudioContext } from "./AudioProvider";
import { Button, Chip, Stack } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

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
      <Button onClick={play} variant="contained" sx={{ color: 'white', backgroundColor: 'black' }}>
        <PlayArrowIcon />
      </Button>
      <Button onClick={pause} variant="contained" sx={{ color: 'white', backgroundColor: 'black' }}>
        <PauseIcon />
      </Button>
      <Chip label={audio?.currentTime.toFixed(2) + "s"} />
    </Stack>
  )
}