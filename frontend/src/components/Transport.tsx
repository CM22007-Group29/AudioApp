import { useAudioContext } from "./AudioProvider";
import { Button } from "@mui/material";

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
        </div>
    )
}