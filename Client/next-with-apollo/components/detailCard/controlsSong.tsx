import { Button, IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useAddView, useViews } from "../hooks/useViews";
import Context from "../../lib/context";
import { useIsLikedByUser, useUserFunctions } from "../hooks/useUserActions";
type Props = {
  startPlayer: () => void;
  addToQueue: () => void;
  id: string;
};
export const ControlsDetailSong: React.FC<Props> = ({
  children,
  startPlayer,
  addToQueue,
  id,
}) => {
  const { userContext } = useContext(Context);
  const { addView } = useAddView();
  const { isLiked, refetchLiked } = useIsLikedByUser(
    userContext?.user?.sub ?? "",
    id,
    true,
    true
  );

  const { onAddLike, onRemoveLikeRef, onAddViewRef } = useUserFunctions();
  useEffect(() => {
    refetchLiked(userContext?.user?.sub ?? "", id);
  }, [userContext?.user?.sub, id]);

  return (
    <Wrapper>
      <StyledRoundButton
        onClick={() => {
          if (isLiked != true) {
            onAddLike(userContext?.user?.sub ?? "", id);
          } else {
            onRemoveLikeRef(userContext?.user?.sub ?? "", id);
          }
          refetchLiked(userContext?.user?.sub ?? "", id);
        }}
        className="likeBtn"
      >
        {isLiked != true ? (
          <FavoriteBorderRoundedIcon className="like"></FavoriteBorderRoundedIcon>
        ) : (
          <FavoriteIcon className="like"></FavoriteIcon>
        )}
      </StyledRoundButton>
      <StyledRoundButton
        onClick={async () => {
          startPlayer();
 
          onAddViewRef(userContext?.user?.sub ?? "", await(await addView({ variables: { _id: id } })).data?.addView??"");
        }}
        className="playBtn"
      >
        <PlayArrowRoundedIcon className="play"></PlayArrowRoundedIcon>
      </StyledRoundButton>
      <StyledRoundButton onClick={addToQueue} className="queueBtn">
        <PlaylistAddRoundedIcon className="queue"></PlaylistAddRoundedIcon>
      </StyledRoundButton>
    </Wrapper>
  );
};
export default ControlsDetailSong;

const Wrapper = styled.div`
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledRoundButton = styled(Button)`
  margin: 0px 10px 0px 10px !important;
  background-color: #d8dee9 !important;
  height: 65px;
  width: 65px;
  border-radius: 100% !important;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  .like {
    font-size: 2rem;
    transform: translate(0px, 2px);
    fill: #bf616a;
  }
  .play {
    font-size: 2.8rem;
  }
  .queue {
    font-size: 2rem;
  }
`;
