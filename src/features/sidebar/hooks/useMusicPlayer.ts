"use client"
import { useState, useEffect } from "react";

export function useMusicPlayer() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [musicToPlay, setMusicToPlay] = useState<HTMLAudioElement[]>([]);
  const [musicIndex, setMusicIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const music = [
        new Audio('/good-night-lofi-cozy-chill-music-160166.mp3'),
        new Audio('/chill-lofi-background-music-331434.mp3'),
        new Audio('/tvari-tokyo-cafe-159065.mp3')
      ];
      setMusicToPlay(music);
    }
  }, []);

  // 2️⃣ Drugi useEffect: pušta muziku samo kad je sve spremno
  useEffect(() => {
    if (musicToPlay.length === 0) return;

    musicToPlay.forEach((track) => track.pause());

    if (isMusicOn && musicToPlay[musicIndex]) {
      const currentTrack = musicToPlay[musicIndex];
      currentTrack.volume = 0.05;
      currentTrack.play();
    }
  }, [isMusicOn, musicIndex, musicToPlay]);

  function toggleMusic() {
    setIsMusicOn((prev) => !prev);
  }

  function nextSong() {
    setMusicIndex((prev) => (prev + 1) % musicToPlay.length);
  }

  function pervSong() {
    setMusicIndex((prev) => (prev === 0 ? 0 : prev - 1));
  }

  return {
    isMusicOn,
    toggleMusic,
    nextSong,
    pervSong
  };
}
