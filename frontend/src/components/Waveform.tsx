import { useEffect, useRef } from "react";
import { useAudioContext } from "./AudioProvider";

export const Waveform = () => {
  const audio = useAudioContext()
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!audio || !canvas.current) return;

    const ctx = canvas.current.getContext("2d")
    if (!ctx) return;

    const center = canvas.current.height / 2;
    for (let i =0; i < audio.amp_data.length; i++) {
      const size = audio.amp_data[i];

      ctx.moveTo(10 * i, center - size / 2);
      ctx.lineWidth = 5;
      ctx.lineCap = "round";

      ctx.lineTo(10 * i, center + size / 2);
      ctx.stroke();
    }
  }, [audio])

  return(
    <canvas ref={canvas}></canvas>
  )
}