import { useEffect, useState } from "react";
import { useAudioContext } from "./AudioProvider";
import { Button, Chip } from "@mui/material";

export const Transport = () => {
    const audio = useAudioContext()

    const play = () => {
        audio?.audioRef.current?.play()
    }

    const pause = () => {
        audio?.audioRef.current?.pause()
    }

    return (
        <div>
            <Button onClick={play}>
                Play
            </Button>
            <Button onClick={pause}>
                pause
            </Button>
            <Chip label={audio?.currentTime.toFixed(2) + "s"} />
        </div>
    )
}