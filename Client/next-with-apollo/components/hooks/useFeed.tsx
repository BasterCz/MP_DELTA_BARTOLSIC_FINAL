import { useEffect, useState } from "react";
import {
  useGetLatestPlaylistsQuery,
  useGetLatestSongsQuery,
  useGetMostViewdSongsQuery,
} from "../../__generated__/lib/viewer.graphql";

export const useMostViewdSongs = (
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling } = useGetMostViewdSongsQuery();

  const [viewedSongs, setViewedSongs] = useState(data?.getMostViewdSongs);

  useEffect(() => {
    if (isReady) {
      setViewedSongs(data?.getMostViewdSongs);
      if (withPoll) startPolling(500);
    }
  });
  return {
    viewedSongs: viewedSongs,
  };
};

export const useGetLatestSongs = (
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling } = useGetLatestSongsQuery();

  const [latestSongs, setLatestSongs] = useState(data?.getLatestSongs);

  useEffect(() => {
    if (isReady) {
      setLatestSongs(data?.getLatestSongs);
      if (withPoll) startPolling(500);
    }
  });
  return {
    latestSongs: latestSongs,
  };
};

export const useGetLatestPlaylists = (
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling } = useGetLatestPlaylistsQuery();

  const [latestPlaylists, setLatestPlaylists] = useState(
    data?.getLatestPlaylists
  );

  useEffect(() => {
    if (isReady) {
      setLatestPlaylists(data?.getLatestPlaylists);
      if (withPoll) startPolling(500);
    }
  });
  return {
    latestPlaylists: latestPlaylists,
  };
};
