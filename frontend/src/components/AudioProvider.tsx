import { createContext, useRef, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAudio } from "../services/audioService";

export type Word = {
  word: string;
  startTime: number;
  endTime: number;
  enabled: boolean;
}

export type AudioState = {
    source: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    endTime: number | null;
    currentTime: number;
    setTime: (time: number) => void;
    ampData: number[];
    wordData: Word[];
    setAudioContext: React.Dispatch<React.SetStateAction<AudioState>> | null;
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
    endTime: null,
    currentTime: 0,
    setTime: (time) => {
      if (audio.current) {
        audio.current.currentTime = time;
      }
    },
    ampData: getAmplitudeData(),
    wordData: [
      {
        word: "Hello",
        startTime: 0,
        endTime: 100,
        enabled: true
      },
      {
        word: "my",
        startTime: 150,
        endTime: 270,
        enabled: true
      },
      {
        word: "name",
        startTime: 270,
        endTime: 350,
        enabled: true
      },
      {
        word: "is",
        startTime: 400,
        endTime: 500,
        enabled: true
      }
    ],
    setAudioContext: null
  });

  useEffect(() => {
    if (audioContext.audioRef.current && !audioContext.endTime) {
      setAudioContext({
        ...audioContext,
        endTime: audioContext.audioRef.current.duration,
      });
    }

    const interval = setInterval(() => {
      if (audio.current?.currentTime) {
        setAudioContext({
          ...audioContext,
          currentTime: audio.current?.currentTime
        });
      }
    }, 100);

      //Clearing the interval
      return () => clearInterval(interval);
  }, [audioContext]);

  return (
    <AudioContext.Provider value={{ ...audioContext, setAudioContext }}>
      <audio ref={audio}>
        <source src={ audioContext.source } type="audio/mpeg" />  
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);