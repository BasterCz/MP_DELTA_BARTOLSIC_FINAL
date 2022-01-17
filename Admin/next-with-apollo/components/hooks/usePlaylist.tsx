import { useEffect, useState } from "react";
import {  ClientPlaylistFragmentDoc, PlaylistDocument, usePlaylistDeleteMutation, usePlaylistQuery, usePlaylistSongsQuery, usePlaylistsQuery } from "../../__generated__/lib/viewer.graphql";
export const usePlaylistMultiple = () => {
    const { data: dataP, loading: loadingP, error: errorP, refetch, client } = usePlaylistsQuery({ pollInterval: 5000 });
    const [playlists, setPlaylists] = useState(dataP?.playlists);

    const [deletePlaylist] = usePlaylistDeleteMutation();
    const onDelete = async (id: string) => {
        await deletePlaylist(
            { 
                variables: { _id: id }, 
                optimisticResponse: {
                    playlistDelete:{
                        _id: id
                    }
                },
                update(cache) {
                    const playlistToDelte = client.readFragment({
                        id: "Playlist:"+id, 
                        fragment: ClientPlaylistFragmentDoc
                    });
                    if ( playlistToDelte ) {
                        client.writeFragment({
                            id: "Playlist:"+id,
                            fragment: ClientPlaylistFragmentDoc,
                            data: {
                                ...PlaylistDocument,
                                _deleted: true
                            }
                        });
                    }
                }
            }
            );
        
    }
    useEffect(() => {
        setPlaylists(dataP?.playlists?.filter(item => !item?._deleted));
    }, [dataP])
    return {
        playlists: playlists,
        onDeletePlaylist: onDelete
    }
}
export const usePlaylistOne = (id: string, isReady : boolean) => {
    const { data: dataP, loading: loadingP, error: errorP } = usePlaylistQuery({ variables: { _id: id as string }, skip: Number.isNaN(id) });
    const { data: dataS, loading: loadingS, error: errorS, startPolling } = usePlaylistSongsQuery({ variables: { _id: id as string }, skip: Number.isNaN(id) });

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
