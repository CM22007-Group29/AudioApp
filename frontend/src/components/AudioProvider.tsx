import { createContext, useRef, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAudio, getTimestamps } from "../services/audioService";

export type Word = {
  word: string;
  startTime: number;
  endTime: number;
  isRemoved: boolean;
}

export type AudioState = {
    source: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    endTime: number | null;
    currentTime: number;
    setTime: (time: number) => void;
    ampData: number[];
    wordData: Word[];
    setAudioContext: React.Dispatch<React.SetStateAction<AudioState>>;
}

const AudioContext = createContext<AudioState | null>(null);

const getAmplitudeData = () => {
  return Array.from({length: 100}, () => Math.floor(Math.random() * 100));
}

export const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const audio = useRef<HTMLAudioElement>(null);
  const [audioContext, setAudioContext] = useState<AudioState>({
    source: "todo/path.mp3",
    audioRef: audio,
    endTime: 3000,
    currentTime: 0,
    setTime: (time) => {
      if (audio.current) {
        audio.current.currentTime = time;
      }
    },
    ampData: getAmplitudeData(),
    wordData: [
      { word: "Hello", startTime: 0, endTime: 100, isRemoved: true },
      { word: "my", startTime: 150, endTime: 270, isRemoved: true },
      { word: "name", startTime: 270, endTime: 350, isRemoved: true },
      { word: "is", startTime: 400, endTime: 500, isRemoved: true }
    ],
    setAudioContext: () => {}
  });

  useEffect(() => {
    if (user) {
      getTimestamps(user.id).then((timestamps) => {
        setAudioContext(prev => ({ ...prev, wordData: timestamps }));
      });
    }
  }, [user]);

  // Set setAudioContext function in the state (so it's available in context)
  useEffect(() => {
    setAudioContext(prev => ({ ...prev, setAudioContext }));
  }, [setAudioContext]);

  // Set endTime once on mount when audio is loaded
  useEffect(() => {
    if (audio.current && !audioContext.endTime) {
      setAudioContext(prev => ({
        ...prev,
        endTime: audio.current?.duration || null,
      }));
    }
  }, []); // run once on mount

  // Update currentTime at interval without causing an infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (audio.current) {
        setAudioContext(prev => ({
          ...prev,
          currentTime: audio.current!.currentTime
        }));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []); // run once on mount

  return (
    <AudioContext.Provider value={{ ...audioContext, setAudioContext }}>
      <audio ref={audio}>
        <source src={audioContext.source} type="audio/mpeg" />  
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);