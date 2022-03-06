import React, { Dispatch, SetStateAction } from "react";

type DetailOfType = "song" | "playlist";

type PageContextProps = {
    detailID : string;
    queueVisible : boolean;
    playerVisible: boolean;
    setQueueVisible : React.Dispatch<React.SetStateAction<boolean>>;
    handlerResultClick : (_id: string, _detailOf: DetailOfType) => void
    handlerStartPlayer : (id: string, waveform: number[], title: string, imageSrc: string, audioSrc: string) => void;
    handlerAddSongToQueue: (id: string, waveform: number[], title: string, imageSrc: string, audioSrc: string) => void;
}

export const Context = React.createContext<PageContextProps>(({} as PageContextProps));

export default Context;