import { useEffect, useState } from "react";
import {
    useAddLikeRefMutation,
  useAddPlaylistRefMutation,
  useAddUserMutation,
  useAddViewRefMutation,
  useCheckUserExistsQuery,
  useIsLikedByUserQuery,
  useRemoveLikeRefMutation,
  useRemovePlaylistRefMutation,
  useRemoveViewRefMutation,
} from "../../__generated__/lib/viewer.graphql";

export const useCheckUserExists = (
  userID: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling, refetch } = useCheckUserExistsQuery({
    variables: { userID: userID as string },
    skip: Number.isNaN(userID),
  });

  const [userExists, setUserExists] = useState(data?.checkUserExists);

  useEffect(() => {
    if (isReady) {
      setUserExists(data?.checkUserExists);
      if (withPoll) startPolling(500);
    }
  });
  return {
      userRefetch: refetch,
    userExists,
    setUserExists
  };
};

export const useIsLikedByUser = (
  userID: string,
  objectID: string,
  isReady: boolean,
  withPoll: boolean = true
) => {
  const { data, loading, error, startPolling, refetch } = useIsLikedByUserQuery({
    variables: { userID: userID as string, objectID: objectID as string },
    skip: Number.isNaN(userID),
  });

  const [isLiked, setIsLiked] = useState(data?.isLikedByUser);

  useEffect(() => {
    if (isReady) {
      setIsLiked(data?.isLikedByUser);
      if (withPoll) startPolling(500);
    }
  }), [data?.isLikedByUser];
  return {
      refetchLiked: (userID:string, objectID:string)=>{refetch({userID: userID, objectID: objectID});},
    isLiked,
    setIsLiked
  };
};

export const useUserFunctions = () => {
  const [addUser] = useAddUserMutation();
  const [addLike] = useAddLikeRefMutation();
  const [addViewRef] = useAddViewRefMutation();
  const [addPlaylistRef] = useAddPlaylistRefMutation();
  const [removeLikeRef] = useRemoveLikeRefMutation();
  const [removeViewRef] = useRemoveViewRefMutation();
  const [removePlaylistRef] = useRemovePlaylistRefMutation();

  const onAddUser = async (userID: string) => {
    await addUser({
      variables: { userID: userID as string },
    });
  };

  const onAddLike = async (userID: string, objectID: string) => {
    await addLike({
      variables: { userID: userID as string, objectID: objectID as string }
    });
  };

  const onAddViewRef = async (userID: string, objectID: string) => {
    await addViewRef({
      variables: { userID: userID as string, objectID: objectID as string }
    });
  };

  const onAddPlaylistRef = async (userID: string, objectID: string) => {
    await addPlaylistRef({
      variables: { userID: userID as string, objectID: objectID as string }
    });
  };

  const onRemoveLikeRef = async (userID: string, objectID: string) => {
    await removeLikeRef({
      variables: { userID: userID as string, objectID: objectID as string }
    });
  };

  const onRemoveViewRef = async (userID: string, objectID: string) => {
    await removeViewRef({
      variables: { userID: userID as string, objectID: objectID as string }
    });
  };

  const onRemovePlaylistRef = async (userID: string, objectID: string) => {
    await removePlaylistRef({
      variables: { userID: userID as string, objectID: objectID as string }
    });
  };

  return {
    onAddUser,
    onAddLike,
    onAddViewRef,
    onAddPlaylistRef,
    onRemoveLikeRef,
    onRemoveViewRef,
    onRemovePlaylistRef

  };
};

