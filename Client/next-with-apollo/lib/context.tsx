import { UserContext } from "@auth0/nextjs-auth0";
import React, { Dispatch, SetStateAction } from "react";

type DetailOfType = "song" | "playlist";

type SongInfo = {
    id: string;
    name: string;
    singer: string;
    cover: string;
    musicSrc: string;
}

type PageContextProps = {
    detailID : string;
    queueVisible : boolean;
    playerVisible: boolean;
    userContext: UserContext | null;
    setQueueVisible : React.Dispatch<React.SetStateAction<boolean>>;
    handlerResultClick : (_id: string, _detailOf: DetailOfType) => void
    handlerStartPlayer : (id: string, waveform: number[], title: string, imageSrc: string, audioSrc: string) => void;
    handlerAddSongToQueue: (id: string, waveform: number[], title: string, imageSrc: string, audioSrc: string) => void;
    handlerStartPlaylistPlayer: (waveforms: number[][], songsQueue: SongInfo[]) => void;
    handlerAddPlaylistToQueue: (waveforms: number[][], songsQueue: SongInfo[]) => void;
    setUserContext: React.Dispatch<React.SetStateAction<UserContext|null>>;
}

export const Context = React.createContext<PageContextProps>(({} as PageContextProps));

export default Context;