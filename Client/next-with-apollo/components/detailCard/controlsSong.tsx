import { Button, IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";

import React from "react";
import styled from "styled-components";
type Props = {
  startPlayer: () => void;
  addToQueue: ()=> void;
}
export const ControlsDetailSong: React.FC<Props> = ({ children, startPlayer, addToQueue  }) => {
  return (
    <Wrapper>
      <StyledRoundButton className="likeBtn">
        <FavoriteBorderRoundedIcon className="like"></FavoriteBorderRoundedIcon>
      </StyledRoundButton>
      <StyledRoundButton onClick={startPlayer} className="playBtn">
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
      fill : #BF616A;
  }
  .play {
      font-size: 2.8rem;
  }
  .queue {
      font-size: 2rem;
  }
`;
