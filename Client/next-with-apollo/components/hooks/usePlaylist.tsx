import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import {  ClientPlaylistFragmentDoc, PlaylistDocument, usePlaylistDeleteMutation, usePlaylistQuery, usePlaylistSongsQuery, usePlaylistsQuery } from "../../__generated__/lib/viewer.graphql";
export const usePlaylistMultiple = () => {
    const { data: dataP, loading: loadingP, error: errorP, refetch, client } = usePlaylistsQuery({ pollInterval: 500 });
    const [playlists, setPlaylists] = useState(dataP?.playlists);
    console.log(errorP?.message)
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

    const fuzzySearch = (search: string) => {
        const options = {
          findAllMatches: true,
          keys: ["name", "description"],
        };
        if (playlists) {
          const fuse = new Fuse(playlists, options);
    
          return search.length > 0 ? fuse.search(search).map(out=>out.item) : null;
        }
      };
    return {
        playlists: playlists,
        onDeletePlaylist: onDelete,
        fuzzySearch: fuzzySearch
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
