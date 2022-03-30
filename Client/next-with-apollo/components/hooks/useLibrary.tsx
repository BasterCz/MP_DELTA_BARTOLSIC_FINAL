import { useEffect, useState } from "react";
import {
  useGetLastViewdSongsQuery,
  useGetLikeRefsQuery,
  useGetPlaylistRefQuery,
} from "../../__generated__/lib/viewer.graphql";

export const useGetLatestViewdSongs = (
  userID: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling } = useGetLastViewdSongsQuery({
    variables: { userID: userID as string },
    skip: Number.isNaN(userID),
  });

  const [lastViewd, setLastViewd] = useState(data?.getLastViewdSongs);

  useEffect(() => {
    if (isReady) {
      setLastViewd(data?.getLastViewdSongs);
      if (withPoll) startPolling(500);
    }
  });
  return {
    lastViewd: lastViewd,
  };
};

export const useGetPlaylistRef = (
  userID: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling } = useGetPlaylistRefQuery({
    variables: { userID: userID as string },
    skip: Number.isNaN(userID),
  });

  const [playlistRefs, setPlaylistRefs] = useState(data?.getPlaylistRef);

  useEffect(() => {
    if (isReady) {
      setPlaylistRefs(data?.getPlaylistRef);
      if (withPoll) startPolling(500);
    }
  });
  return {
    playlistRefs: playlistRefs,
  };
};

export const useGetLikeRefs = (
  userID: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling } = useGetLikeRefsQuery({
    variables: { userID: userID as string },
    skip: Number.isNaN(userID),
  });

  const [likeRefs, setLikeRefs] = useState(data?.getLikeRefs);

  useEffect(() => {
    if (isReady) {
      setLikeRefs(data?.getLikeRefs);
      if (withPoll) startPolling(500);
    }
  });
  return {
    likeRefs: likeRefs,
  };
};
