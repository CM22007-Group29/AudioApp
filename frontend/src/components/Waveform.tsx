import { useEffect, useRef, useCallback } from "react";
import { AudioState, useAudioContext } from "./AudioProvider";
import { Box } from "@mui/system";
import { Button, IconButton, Typography } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import { Word } from "./AudioProvider"

import "./Waveform.css"

export const Waveform = () => {
  const audio = useAudioContext()
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const cursor = useRef<HTMLCanvasElement | null>(null);

  const timeToPixels = useCallback((time: number) => {
    if (!audio || !audio.audioRef.current || !canvas.current) return 0;
    return (time / audio?.audioRef.current?.duration) * canvas.current.width;
  }, [audio]);

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

      // Doing this outside the render function messes this up a bit
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
      const xPos = timeToPixels(audio.audioRef.current.currentTime);
      ctx?.moveTo(xPos, 0);
      ctx?.lineTo(xPos, cursor.current?.clientHeight);
      ctx.lineWidth = 2
      ctx.strokeStyle = "red"
      ctx?.stroke();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [audio, timeToPixels]);

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

    // Have to set state like this to trigger a redraw
    audio.setAudioContext?.((prevAudio: AudioState) => ({
      ...prevAudio,
      wordData: prevAudio.wordData.map((word, i) =>
        i === wordIndex ? { ...word, enabled: !word.isRemoved } : word
      ),
    }));
  }, [audio]);

  return(
    <Box sx={{ width: "100%", height: 200 }}>
      <canvas
        ref={canvas}
        height={150}
        style={{
          position: "absolute",
          backgroundColor: "#00000005",
          borderRadius: "10px"
        }}
      />
      <div style={{ display: "flex" }}>
        {audio?.wordData.map((word, i) =>
          <div
            key={i}
            className="word-container"
            style={{
              left: timeToPixels(word.startTime) + 
                    (canvas.current?.getBoundingClientRect().left ?? 0),
              width: timeToPixels(word.endTime) - timeToPixels(word.startTime)
            }}
          >
            <div 
              className={
                `word-box
                ${word.isRemoved ? "word-box-enabled" : "word-box-disabled"}
              `}
            >
              <IconButton onClick={toggleWord(i)}>
                {
                  word.isRemoved ? 
                    <VolumeOff fontSize="small"/>
                  :
                    <VolumeUp fontSize="small"/>
                }
              </IconButton>
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Button onClick={moveToWord(word)}>
                <Typography 
                  sx={{
                    textTransform: "none",
                    textDecoration: word.isRemoved ? "" : "line-through", 
                    color: "black"
                  }
                }>
                  {word.word}
                </Typography>
              </Button>
            </div>
          </div>
        )}
      </div>
      <canvas ref={cursor} height={150} style={{ position: "absolute" }}/>
    </Box>
  )
}