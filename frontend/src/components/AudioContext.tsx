import { createContext, useContext } from "react";

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

export const AudioContext = createContext<AudioState | null>(null);
export const useAudioContext = () => useContext(AudioContext);