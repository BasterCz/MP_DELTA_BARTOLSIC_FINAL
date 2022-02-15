
import { useEffect, useState } from "react";
import {  usePlaylistDeleteMutation, usePlaylistQuery, usePlaylistSongsQuery, usePlaylistsQuery, usePlaylistsSearchQuery } from "../../__generated__/lib/viewer.graphql";
export const usePlaylistMultiple = () => {
    const { data: dataP, loading: loadingP, error: errorP, refetch, client } = usePlaylistsQuery({ pollInterval: 500 });
    const { data: dataFuzzy, loading: loadingFuzzy, error: errorFuzzy, refetch: refetchFuzzy } = usePlaylistsSearchQuery({ variables: {query: ""}});
    const [playlists, setPlaylists] = useState(dataP?.playlists); 
    const [fplaylists, setFPlaylists] = useState(dataFuzzy?.playlistsSearch);

    useEffect(() => {
        setPlaylists(dataP?.playlists?.filter(item => !item?._deleted));
    }, [dataP])

    useEffect(() => {
        setFPlaylists(dataFuzzy?.playlistsSearch?.filter(item => !item?._deleted));
    }, [dataFuzzy])

    const fuzzySearch = async (search: string) => {
        await refetchFuzzy({ query: search})
        return;
    };

    return {
        playlists: playlists,
        playlistsFound: fplaylists,
        fuzzySearchPlaylist: fuzzySearch
    }
}
export const usePlaylistOne = (id: string, isReady : boolean) => {
    const { data: dataP, loading: loadingP, error: errorP } = usePlaylistQuery({ variables: { _id: id as string }, skip: Number.isNaN(id) });
    const { data: dataS, loading: loadingS, error: errorS, startPolling } = usePlaylistSongsQuery({ variables: { _id: id as string }, skip: Number.isNaN(id), pollInterval: 500 });

    const [songs, setSongs] = useState(dataS?.playlistSongs);
    const [playlist, setPlaylist] = useState(dataP?.playlist);
    

    const [deletePlaylist] = usePlaylistDeleteMutation();
    const onDelete = (id: string) => {
        deletePlaylist({ variables: { _id: id } })
    }

    useEffect(() => {
        if (isReady) {
            setPlaylist(dataP?.playlist);
            setSongs(dataS?.playlistSongs);
            startPolling(500);
        }
    })

    return {
        playlist: playlist,
        songs: songs,
        onDeletePlaylist: onDelete
    }
}
