import { createContext, useRef, useContext, useState, useEffect } from "react";

type AudioState = {
    source: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    endTime: number | null;
    currentTime: number;
    setTime: (time: number) => void;
}

const AudioContext = createContext<AudioState | null>(null);

export const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [context, setContext] = useState<AudioState>({
    source: "todo/path.mp3",
    audioRef: audio,
    endTime: null,
    currentTime: 0,
    setTime: (time) => {
      if (audio.current) {
        audio.current.currentTime = time;
      }
    }
  });

  useEffect(() => {
    if (context.audioRef.current && !context.endTime) {
      setContext({
        ...context,
        endTime: context.audioRef.current.duration
      });
    }

    const interval = setInterval(() => {
      if (audio.current?.currentTime) {
        setContext({
          ...context,
          currentTime: audio.current?.currentTime
        });
      }
    }, 100);

      //Clearing the interval
      return () => clearInterval(interval);
  }, [context]);

  return (
    <AudioContext.Provider value={context}>
      <audio ref={audio}>
        <source src="audio_input.mp3" type="audio/mpeg" />  
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);