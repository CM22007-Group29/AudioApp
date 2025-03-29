import { useEffect, useState } from "react";
import { useAudioContext } from "./AudioContext";
import { Slider, Stack } from "@mui/material";

export const ProgressBar = () => {
  const audio = useAudioContext()
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (audio?.currentTime) {
      setProgress(audio?.currentTime);
    }
  }, [audio])

  const changeTime = (_event: Event, newValue: number | number[]) => {
    audio?.setTime(newValue as number);
    setProgress(newValue as number);
  }

  return (
    <Stack direction="row" spacing={2}>
      <Slider defaultValue={0}
        min={0}
        max={audio?.endTime ? audio.endTime : 1}
        step={0.01}
        value={progress}
        onChange={changeTime}
      />
    </Stack>
  )
}