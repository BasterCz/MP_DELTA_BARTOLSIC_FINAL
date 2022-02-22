import React from "react";
import ReactPlayer from "react-player";

type DetailOfType = "song" | "playlist";

type PlayerContextProps = {
    setIsSliderMoving : React.Dispatch<React.SetStateAction<boolean>>;
    setSliderValue : React.Dispatch<React.SetStateAction<number>>;
    setCommited : React.Dispatch<React.SetStateAction<number>>;
    setIsPlaying : React.Dispatch<React.SetStateAction<boolean>>;
    setAudioTime : React.Dispatch<React.SetStateAction<number>>;
    setAudioBufferTime : React.Dispatch<React.SetStateAction<number>>;
    setAudioCurrentTime : React.Dispatch<React.SetStateAction<number>>;
    setWavefrom: React.Dispatch<React.SetStateAction<number[]>>;
    isSliderMoving: boolean;
    sliderValue : number;
    isPlaying : boolean;
    audioRef : React.RefObject<ReactPlayer>;
    playBtnRef: React.RefObject<HTMLButtonElement>;
    sliderRef: React.RefObject<HTMLInputElement>;
    fwdBtnRef: React.RefObject<HTMLButtonElement>;
    revBtnRef: React.RefObject<HTMLButtonElement>;
    playFile: string;
    commited: number;
    audioTime: number;
    audioBufferTime: number;
    audioCurrentTime: number;
    waveform: number[];
    handlerPlay: () => void;
}

export const PlayerContext = React.createContext<PlayerContextProps>({} as PlayerContextProps);