import { createContext, useRef, useContext, useState, useEffect } from "react";

type AudioState = {
    source: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    currentTime: number;
}

const AudioContext = createContext<AudioState | null>(null);

export const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [context, setContext] = useState<AudioState>({
    source: "todo/path.mp3",
    audioRef: audio,
    currentTime: 0
  });

  useEffect(() => {
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