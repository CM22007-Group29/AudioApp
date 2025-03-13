import { useEffect, useRef } from "react";
import { useAudioContext } from "./AudioProvider";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export const Waveform = () => {
  const audio = useAudioContext()
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const cursor = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
      const ctx = canvas.current.getContext("2d");

      let animationFrameId = 0;

      const render = () => {
        canvas.current.width = canvas.current.parentElement?.clientWidth;

        const center = canvas.current.height / 2;

        const x_step = canvas.current.width / audio.amp_data.length;
        console.log(x_step)

        for (let i =0; i < audio.amp_data.length; i++) {
          const size = audio.amp_data[i];
          
          ctx.moveTo(x_step * i, center - size / 2);
          ctx.lineWidth = 5;
          ctx.lineCap = "round";

          ctx.lineTo(x_step * i, center + size / 2);
          ctx.stroke();
        }

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
        cursor.current.width = canvas.current.parentElement?.clientWidth;

        ctx?.moveTo(cursor.current?.width * (audio?.audioRef.current.currentTime / audio.endTime), 0);
        ctx?.lineTo(cursor.current?.width * (audio?.audioRef.current.currentTime / audio.endTime), cursor.current?.clientHeight);
        ctx.lineWidth = 2
        ctx.strokeStyle = "red"
        ctx?.stroke();

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      return () => cancelAnimationFrame(animationFrameId);
  }, [audio]);

  const handleClick = (event) => {
      const rect = canvas.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const progress = (event.clientX - rect.left) / rect.width;
      console.log(audio?.audioRef.current?.duration)
      audio.setTime(progress * audio?.audioRef.current?.duration);
  }

  useEffect(() => {
    cursor.current?.addEventListener("click", handleClick);
    // return () => cursor.current.removeEventListener("click", handleClick);
  }, []);

  return(
    <Box sx={{ width: "100%" }}>
      <canvas ref={cursor} style={{ position: "absolute" }}></canvas>
      <canvas ref={canvas}></canvas>
    </Box>
  )
}