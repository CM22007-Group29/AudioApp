import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { AudioState, useAudioContext } from "./AudioProvider";
import { Box, Stack } from "@mui/system";
import { Button, IconButton, Typography } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import { Word } from "./AudioProvider"

import "./Waveform.css"

export const Waveform = () => {
  const audio = useAudioContext()

  const fullWaveformWidth = useMemo(() => {
    return (audio?.audioRef.current?.duration ?? 0) * 500
  }, [audio]);

  // Both waveform and cursor canvases are just the width of the screen and 
  // are drawn taking into account the scroll offset
  const waveformCanvas = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvas = useRef<HTMLCanvasElement | null>(null);
  const [scrollX, setScrollX] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const timeToPixels = useCallback((time: number) => {
    if (!audio || !audio.audioRef.current) {
      return 0;
    }

    const durationMS = audio?.audioRef.current?.duration * 1000
    const progress = (time / durationMS) * fullWaveformWidth;
    return progress;
  }, [audio, fullWaveformWidth]);

  const pixelsToTime = useCallback((pixels: number) => {
    if (!audio || !audio.audioRef.current) {
      return 0;
    }

    const progress = pixels / fullWaveformWidth;
    return progress * (audio?.audioRef.current?.duration);
  }, [audio, fullWaveformWidth]);

  // Draw the waveform
  useEffect(() => {
    if (!waveformCanvas.current || !audio) {
      return;
    }

    const ctxCanvas = waveformCanvas.current.getContext("2d");

    if (!ctxCanvas) {
      return;
    }

    waveformCanvas.current.width =
      waveformCanvas.current.parentElement?.clientWidth ?? 0;

    const center = waveformCanvas.current.height / 2;
    const x_step = 10;

    ctxCanvas.beginPath();
    for (let i = 0; i < audio.ampData.length; i++) {
      const size = audio.ampData[i];
      const x_pos = i * x_step - scrollX;
      if (x_pos > fullWaveformWidth) {
        break;
      }
      if (x_pos > 0) {
        ctxCanvas.moveTo(x_pos, center - size / 2);
        ctxCanvas.lineWidth = 5;
        ctxCanvas.lineCap = "round";
        ctxCanvas.lineTo(x_pos, center + size / 2);
      }
    }

    ctxCanvas.strokeStyle = "black";
    ctxCanvas.stroke();

    return;
  }, [audio, fullWaveformWidth, scrollX]);

  // Draw the cursor
  useEffect(() => {
    if (!cursorCanvas.current || !waveformCanvas.current) {
      return;
    }

    const ctx = cursorCanvas.current.getContext("2d");

    // Use render animation to smooth out the motion
    let animationFrameId = 0;
    const render = () => {
      if (!cursorCanvas.current || !audio || !audio.audioRef.current ||
          !ctx || !scrollContainerRef.current) {
        return;
      }

      cursorCanvas.current.width =
        cursorCanvas.current.parentElement?.clientWidth ?? 0;
      ctx.clearRect(
        0,
        0,
        cursorCanvas.current.width,
        cursorCanvas.current.height
      );

      const currentTimeMS = audio.audioRef.current.currentTime * 1000;

      const container = scrollContainerRef.current;
      if (container && !audio.audioRef.current.paused) {
        const containerWidth = container.clientWidth;
        // Desired scroll value to center the current cursor position
        let desiredScroll = timeToPixels(currentTimeMS) - containerWidth / 2;
        // Clamp desiredScroll to valid scroll range
        desiredScroll = Math.max(
          0,
          Math.min(desiredScroll, fullWaveformWidth - containerWidth)
        );

        // Only update if the difference is significant (e.g., more than
        // 1 pixel)
        if (Math.abs(container.scrollLeft - desiredScroll) > 1) {
          container.scrollLeft = desiredScroll;
        }
      }

      const xPos = Math.floor(
        timeToPixels(currentTimeMS) - container.scrollLeft
      );

      const currentWord = audio.wordData.find(word => (word.startTime <= currentTimeMS + 50 && currentTimeMS < word.endTime));
      if (currentWord && currentWord.isRemoved) {
        console.log(currentWord)
        audio.setTime(currentWord.endTime / 1000)
      }

      ctx?.moveTo(xPos, 0);
      ctx?.lineTo(xPos, cursorCanvas.current?.clientHeight);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx?.stroke();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [audio, timeToPixels, scrollX]);

  const handleCursorClick = useCallback((event : MouseEvent) => {
    if (!waveformCanvas.current || !audio || !audio.audioRef.current) {
      return;
    }

    const rect = waveformCanvas.current.getBoundingClientRect();
    const progress = event.clientX - rect.left + scrollX;
    audio.setTime(pixelsToTime(progress));
  }, [audio, scrollX, pixelsToTime]);

  // Add cursor click event
  useEffect(() => {
    const current = cursorCanvas.current;
    current?.addEventListener("click", handleCursorClick);
    return () => current?.removeEventListener("click", handleCursorClick);
  }, [handleCursorClick]);

  // Move the cursor to a word
  const moveToWord = useCallback((word: Word) => () => {
    if (!audio) {
      return;
    }
    audio.setTime(word.startTime / 1000);
  }, [audio]);

  const moveToWordAndScroll = useCallback((word: Word) => () => {
    if (!audio || !scrollContainerRef.current) {
      return;
    }
    audio.setTime(word.startTime / 1000);

    const container = scrollContainerRef.current;
    let desiredScroll =  timeToPixels(word.startTime) - 500;
    desiredScroll = Math.max(
      0,
      Math.min(desiredScroll, fullWaveformWidth - container.clientWidth)
    );
    container.scrollLeft = desiredScroll;
  }, [audio, scrollContainerRef, fullWaveformWidth, timeToPixels]);

  // Enable/disable word
  const toggleWord = useCallback((wordIndex: number) => () => {
    if (!audio) {
      return;
    }

    // Have to set state like this to trigger a redraw
    audio.setAudioContext?.((prevAudio: AudioState) => ({
      ...prevAudio,
      wordData: prevAudio.wordData.map((word, i) =>
        i === wordIndex ? { ...word, isRemoved: !word.isRemoved } : word
      ),
    }));
  }, [audio]);

  return( audio &&
    <Stack direction="column" gap={1}>
      <Box>
        <canvas
          ref={waveformCanvas}
          height={150}
          style={{
            position: "absolute",
            backgroundColor: "#00000005",
            borderRadius: "10px",
            pointerEvents: "none"
          }}
        />
        <canvas 
          ref={cursorCanvas}
          height={150} 
          style={{ position: "absolute", pointerEvents: "auto", zIndex: 999 }}
        />
        <Box
          ref={scrollContainerRef}
          sx={{ 
            width: "100%",
            height: 200,
            overflowX: "scroll",
            position: "relative",
            overscrollBehavior: "none",
            scrollBehavior: "auto",
            // pointerEvents: "none"
          }} 
          onScroll={(e) => setScrollX(e.currentTarget.scrollLeft)}
        >
          <Box 
            sx={{
              width: (audio?.audioRef.current?.duration ?? 0) * 500, 
              height: 200,
              position: "relative"
            }}
          >
            <div style={{ display: "flex" }}>
              {audio?.wordData.map((word, i) =>
                <div
                  key={i}
                  className="word-container"
                  style={{
                    left: timeToPixels(word.startTime),
                    width:
                      timeToPixels(word.endTime) -
                      timeToPixels(word.startTime)
                  }}
                >
                  <div 
                    className={
                      `word-box
                      ${!word.isRemoved ?
                        "word-box-enabled" : "word-box-disabled"}
                    `}
                  >
                    <IconButton onClick={toggleWord(i)}>
                      {
                        !word.isRemoved ? 
                          <VolumeOff fontSize="small"/>
                        :
                          <VolumeUp fontSize="small"/>
                      }
                    </IconButton>
                  </div>
                  <div 
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    <Button
                      onClick={moveToWord(word)}
                      style={{ pointerEvents: "all" }}
                    >
                      <Typography 
                        sx={{
                          textTransform: "none",
                          textDecoration:
                            !word.isRemoved ? "" : "line-through", 
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
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%"
        }}
        gap={0}
      >
        {audio?.wordData.map((word, i) =>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={moveToWordAndScroll(word)}
                style={{ pointerEvents: "all", margin: 0 }}
              >
                <Typography 
                  sx={{
                    textTransform: "none",
                    textDecoration: !word.isRemoved ? "" : "line-through", 
                    color: "black"
                  }
                }>
                  {word.word}
                </Typography>
              </Button>
            </div>
        )}
      </Box>
    </Stack>
  );
};