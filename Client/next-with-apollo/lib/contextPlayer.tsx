import React from "react";
import ReactPlayer from "react-player";

type DetailOfType = "song" | "playlist";

type PlayerContextProps = {
    setIsSliderMoving : React.Dispatch<React.SetStateAction<boolean>>;
    setSliderValue : React.Dispatch<React.SetStateAction<number>>;
    setCommited : React.Dispatch<React.SetStateAction<number>>;
    setIsPlaying : React.Dispatch<React.SetStateAction<boolean>>;
    setAudioTimeOne : React.Dispatch<React.SetStateAction<number>>;
    setAudioTimeTwo : React.Dispatch<React.SetStateAction<number>>;
    setAudioBufferTime : React.Dispatch<React.SetStateAction<number>>;
    setAudioCurrentTime : React.Dispatch<React.SetStateAction<number>>;
    setWavefrom: React.Dispatch<React.SetStateAction<number[]>>;
    setActivePlayer : React.Dispatch<React.SetStateAction<number>>;
    isSliderMoving: boolean;
    sliderValue : number;
    isPlaying : boolean;
    audioRefOne : React.RefObject<ReactPlayer>;
    audioRefTwo : React.RefObject<ReactPlayer>;
    playBtnRef: React.RefObject<HTMLButtonElement>;
    sliderRef: React.RefObject<HTMLInputElement>;
    fwdBtnRef: React.RefObject<HTMLButtonElement>;
    revBtnRef: React.RefObject<HTMLButtonElement>;
    playFileOne: string;
    playFileTwo: string;
    commited: number;
    audioTimeOne: number;
    audioTimeTwo: number;
    audioBufferTime: number;
    audioCurrentTime: number;
    waveform: number[];
    activePlayer: number;
    handlerPlay: () => void;
}

export const PlayerContext = React.createContext<PlayerContextProps>({} as PlayerContextProps);