import { useRef, useEffect } from "react";
import clickSound from "../assets/preview.mp3";

export const useClickSound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(clickSound);
    audioRef.current.volume = 0.4; // adjust volume if needed
  }, []);

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return playClick;
};
