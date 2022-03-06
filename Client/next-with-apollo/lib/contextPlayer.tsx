import React from "react";
import ReactPlayer from "react-player";
import { ReactJkMusicPlayerInstance } from "react-jinke-music-player";

type DetailOfType = "song" | "playlist";
type SongInfo = {
    id: string;
    name: string;
    singer: string;
    cover: string;
    musicSrc: string;
  };

type PlayerContextProps = {
    setIsSliderMoving : React.Dispatch<React.SetStateAction<boolean>>;
    setSliderValue : React.Dispatch<React.SetStateAction<number>>;
    setCommited : React.Dispatch<React.SetStateAction<number>>;
    setIsPlaying : React.Dispatch<React.SetStateAction<boolean>>;
    setAudioTime : React.Dispatch<React.SetStateAction<number>>;
    setAudioBufferTime : React.Dispatch<React.SetStateAction<number>>;
    setAudioCurrentTime : React.Dispatch<React.SetStateAction<number>>;
    setSongQueue: React.Dispatch<React.SetStateAction<SongInfo[]>>;
    setSongIndex: React.Dispatch<React.SetStateAction<number>>;
    
    isSliderMoving: boolean;
    sliderValue : number;
    isPlaying : boolean;
    playBtnRef: React.RefObject<HTMLButtonElement>;
    sliderRef: React.RefObject<HTMLInputElement>;
    fwdBtnRef: React.RefObject<HTMLButtonElement>;
    revBtnRef: React.RefObject<HTMLButtonElement>;
    audioInstance: React.MutableRefObject<ReactJkMusicPlayerInstance | null>;
    commited: number;
    audioTime: number;
    audioBufferTime: number;
    audioCurrentTime: number;
    waveformQueue: number[][];
    songQueue: SongInfo[];
    songIndex: number;

    handlerPlay: () => void;
}

export const PlayerContext = React.createContext<PlayerContextProps>({} as PlayerContextProps);