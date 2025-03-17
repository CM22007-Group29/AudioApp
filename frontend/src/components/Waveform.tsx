import { useEffect, useRef, useCallback } from "react";
import { AudioState, useAudioContext } from "./AudioProvider";
import { Box } from "@mui/system";
import { Button, IconButton, Typography } from "@mui/material";
import { VolumeOff } from "@mui/icons-material";
import { Word } from "./AudioProvider"

export const Waveform = () => {
  const audio = useAudioContext()
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const cursor = useRef<HTMLCanvasElement | null>(null);

  // const timeToPixels = useCallback((time: number) => {
  //   if (!audio || !audio.audioRef.current || !canvas.current) return 0;
  //   return (time / audio?.audioRef.current?.duration) * canvas.current.width;
  // }, [audio]);

  const pixelsToTime = useCallback((pixels: number) => {
    if (!audio || !audio.audioRef.current || !canvas.current) return 0;
    const progress = pixels / canvas.current.width;
    return progress * audio?.audioRef.current?.duration;
  }, [audio]);

  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");

    let animationFrameId = 0;

    const render = () => {
      if (!canvas.current || !audio || !ctx) return;

      canvas.current.width = canvas.current.parentElement?.clientWidth ?? 0;

      const center = canvas.current.height / 2;

      const x_step = canvas.current.width / audio.ampData.length;

      ctx.beginPath();

      for (let i = 0; i < audio.ampData.length; i++) {
        const size = audio.ampData[i];

        ctx.moveTo(x_step * i, center - size / 2);
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineTo(x_step * i, center + size / 2);
      }

      ctx.strokeStyle = "black";
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [audio]);

  useEffect(() => {
    if (!cursor.current) return;
    const ctx = cursor.current.getContext("2d");

    let animationFrameId = 0;

    const render = () => {
      if (!cursor.current || !audio  || !audio.audioRef.current|| !ctx) return;

      cursor.current.width = cursor.current.parentElement?.clientWidth ?? 0;

      ctx?.moveTo(cursor.current?.width * (audio?.audioRef.current.currentTime / audio.audioRef.current.duration), 0);
      ctx?.lineTo(cursor.current?.width * (audio?.audioRef.current.currentTime / audio.audioRef.current.duration), cursor.current?.clientHeight);
      ctx.lineWidth = 2
      ctx.strokeStyle = "red"
      ctx?.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [audio]);

  const handleClick = useCallback((event : MouseEvent) => {
    if (!canvas.current || !audio || !audio.audioRef.current) return;

      const rect = canvas.current.getBoundingClientRect();
      const progress = (event.clientX - rect.left) / rect.width;
      audio.setTime(progress * audio?.audioRef.current?.duration);
  }, [audio]);

  useEffect(() => {
    const current = cursor.current;
    current?.addEventListener("click", handleClick);
    return () => current?.removeEventListener("click", handleClick);
  }, [handleClick]);

  const moveToWord = useCallback((word: Word) => () => {
    if (!audio) return;
    audio.setTime(pixelsToTime(word.startTime));
  }, [audio, pixelsToTime]);

  const toggleWord = useCallback((wordIndex: number) => () => {
    if (!audio) return;
    audio.setAudioContext?.((prevAudio: AudioState) => ({
      ...prevAudio,
      wordData: prevAudio.wordData.map((word, i) =>
        i === wordIndex ? { ...word, enabled: !word.enabled } : word
      ),
    }));
  }, [audio]);

  return(
    <Box sx={{ width: "100%", height: 200 }}>
      <canvas ref={canvas} height={150} style={{ position: "absolute" }}></canvas>
      <canvas ref={cursor} height={150} style={{ position: "absolute" }}></canvas>
      <div style={{ display: "flex" }}>
        {audio?.wordData.map((word, i) =>
          <div key={i} style={{ position: "absolute", left: word.startTime + (canvas.current?.getBoundingClientRect().left ?? 0), width: word.endTime - word.startTime, height: 190, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ width: "100%", borderRadius: "10px", height: "150px", backgroundColor: word.enabled == true ? "rgba(0, 255, 88, 0.3)" : "rgba(255, 0, 0, 0.3)" }}>

              <IconButton style={{ position: "absolute", top: 0, right: 0 }} onClick={toggleWord(i)}>
                  <VolumeOff fontSize="small"/>
              </IconButton>
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Button onClick={moveToWord(word)}>
                <Typography sx={{ textTransform: "none", textDecoration: word.enabled ? "" : "line-through" }}>
                  {word.word}
                </Typography>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}