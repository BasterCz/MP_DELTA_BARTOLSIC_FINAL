import { useEffect, useState } from "react";
import {
  useSongPlaylistsQuery,
  useSongQuery,
  useSongsDeleteMutation,
  useSongsQuery,
} from "../../__generated__/lib/viewer.graphql";
import fuzzy from "fuzzy";
import Fuse from "fuse.js";

export const useSongMultiple = () => {
  const { data, loading, error } = useSongsQuery({ pollInterval: 500 });
  const [songs, setSongs] = useState(data?.songs);

  const [deleteSong] = useSongsDeleteMutation();

  const onDelete = async (id: string) => {
    await deleteSong({ variables: { _id: id } });
  };

  const fuzzySearch = (search: string) => {
    const options = {
      findAllMatches: true,
      keys: ["name"],
    };
    if (songs) {
      const fuse = new Fuse(songs, options);

      return search.length > 0 ? fuse.search(search).map(out=>out.item) : null;
    }
  };

  useEffect(() => {
    setSongs(data?.songs);
  });
  return {
    songs: songs,
    onDeleteSong: onDelete,
    fuzzySearch: fuzzySearch,
  };
};
export const useSongOne = (
  id: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const {
    data: dataS,
    loading: loadingS,
    error: errorS,
    startPolling,
  } = useSongQuery({
    variables: { _id: id as string },
    skip: Number.isNaN(id),
  });

  const [song, setSong] = useState(dataS?.song);

  const [deleteSong] = useSongsDeleteMutation();

  const onDelete = async (id: string) => {
    await deleteSong({ variables: { _id: id } });
  };
  useEffect(() => {
    if (isReady) {
      setSong(dataS?.song);
      if (withPoll) startPolling(500);
    }
  });
  return {
    song: song,
    onDeleteSong: onDelete,
  };
};
export const useSongPlaylists = (
  id: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const {
    data: dataP,
    loading: loadingP,
    error: errorP,
    startPolling,
  } = useSongPlaylistsQuery({
    variables: { _id: id as string },
    skip: Number.isNaN(id),
  });

  const [playlists, setPlaylists] = useState(dataP?.songPlaylists);

  useEffect(() => {
    if (isReady) {
      setPlaylists(dataP?.songPlaylists);
      if (withPoll) startPolling(500);
    }
  });
  return {
    playlists: playlists,
  };
};
