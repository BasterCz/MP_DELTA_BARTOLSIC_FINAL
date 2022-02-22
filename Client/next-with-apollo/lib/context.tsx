import React, { Dispatch, SetStateAction } from "react";

type DetailOfType = "song" | "playlist";

type PageContextProps = {
    detailID : string;
    handlerResultClick : (_id: string, _detailOf: DetailOfType) => void
    handlerStartPlayer : (waveform: number[], title: string, imageSrc: string, fileSrc: string) => void;
}

export const Context = React.createContext<PageContextProps>(({} as PageContextProps));