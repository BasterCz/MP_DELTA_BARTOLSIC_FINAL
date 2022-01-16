import { useEffect, useState } from "react";
import { useSongPlaylistsQuery, useSongQuery, useSongsDeleteMutation, useSongsQuery } from "../../__generated__/lib/viewer.graphql";
export const useSongMultiple = () => {
    const { data, loading, error } = useSongsQuery({ pollInterval: 500 });
    const [songs, setSongs] = useState(data?.songs);

    const [deleteSong] = useSongsDeleteMutation();

    const onDelete = async (id: string) => {
        await deleteSong({ variables: { _id: id } })
    }
    useEffect(() => {
        
        setSongs(data?.songs);
    })
    return {
        songs: songs,
        onDeleteSong: onDelete
    }
}
export const useSongOne = (id: string, isReady : boolean, withPoll : boolean = true) => {
    const { data: dataS, loading: loadingS, error: errorS, startPolling} = useSongQuery({ variables: { _id: id as string }, skip: Number.isNaN(id) });

    const [song, setSong] = useState(dataS?.song);

    const [deleteSong] = useSongsDeleteMutation();

    const onDelete = async (id: string) => {
        await deleteSong({ variables: { _id: id } })
    }
    useEffect(() => {
        if (isReady) {
            setSong(dataS?.song);
            if (withPoll) startPolling(500);
        }
    })
    return {
        song: song,
        onDeleteSong: onDelete
    }
}
export const useSongPlaylists = (id: string, isReady : boolean, withPoll : boolean = true) => {
    const { data: dataP, loading: loadingP, error: errorP, startPolling } = useSongPlaylistsQuery({ variables: { _id: id as string }, skip: Number.isNaN(id) });

    const [playlists, setPlaylists] = useState(dataP?.songPlaylists);

    useEffect(() => {
        if (isReady) {
            setPlaylists(dataP?.songPlaylists);
            if (withPoll) startPolling(500);
        }
    })
    return {
        playlists: playlists
    }
}