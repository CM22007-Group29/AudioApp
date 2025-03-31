import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getTimestamps } from "../services/audioService";
import { AudioContext, AudioState } from "./AudioContext";

const getAmplitudeData = () => {
  return Array.from({length: 10000}, () => Math.floor(Math.random() * 100));
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
    wordData: [],
    setAudioContext: () => {}
  });

  useEffect(() => {
    if (user) {
      getTimestamps(user.id).then((timestamps) => {
        setAudioContext(prev => ({ ...prev, wordData: timestamps }));
      });
      console.log("DONE!")
    }
  }, [user]);

  // Set setAudioContext function in the state (so it's available in context)
  useEffect(() => {
    setAudioContext(prev => ({ ...prev, setAudioContext }));
  }, []);

  // Set endTime once on mount when audio is loaded
  useEffect(() => {
    if (audio.current) {
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
        <source 
          src={user ? `http://localhost:4040/api/audio/${user.id}/process` : ""}
          type="audio/mpeg"
        />  
      </audio>
      {children}
    </AudioContext.Provider>
  );
};