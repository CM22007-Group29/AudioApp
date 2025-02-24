import { createContext, useRef, useContext, useState } from "react";

type AudioState = {
    source: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioState | null>(null);

export const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [context, setContext] = useState<AudioState>({
    source: "todo/path.mp3",
    audioRef: audio
  });

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