import { useState, useEffect } from "react";
import { music } from "../constants/ui-constants";

export function useMusicPlayer(){
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [musicToPlay, ignore] = useState(music);
    const [musicIndex, setMusicIndex] = useState(0);
    
    useEffect(() => {
        musicToPlay.forEach((track) => {
            track.pause();
        });

        if (isMusicOn) {
            const currentTrack = musicToPlay[musicIndex];
            console.log(currentTrack);
            if (currentTrack) {
                currentTrack.volume = 0.05;
                currentTrack.play();
            }
        }
    }, [isMusicOn, musicIndex]);


    function toggleMusic(){
        setIsMusicOn(!isMusicOn);
    }

    function nextSong(){
        if(musicIndex === musicToPlay.length) setMusicIndex(0);
        setMusicIndex((perv) => perv + 1);
    }

    function pervSong(){
        if(musicIndex === 0) return;
        setMusicIndex((perv) => perv - 1);
    }

    return {
        isMusicOn,
        toggleMusic,
        nextSong,
        pervSong
    }
}