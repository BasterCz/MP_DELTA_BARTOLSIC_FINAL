import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { PlayerContext } from "../../lib/contextPlayer";
import Context from "../../lib/context";

export const PlayerControls: React.FC = () => {
  const { audioInstance, fwdBtnRef, revBtnRef, isPlaying, handlerPlay } =
    useContext(PlayerContext);
    const { setQueueVisible } =
    useContext(Context);

  const next = () => {
    if (audioInstance.current !== null && audioInstance.current.playNext)
      audioInstance.current.playNext();
  };
  const previous = () => {
    if (audioInstance.current !== null && audioInstance.current.playPrev)
      audioInstance.current.playPrev();
  };
  const showQueue = () => {
    setQueueVisible(true);
  };
  return (
    <Wrapper>
      <SmallStyledRoundButton ref={revBtnRef}>
        <LoopRoundedIcon />
      </SmallStyledRoundButton>
      <StyledRoundButton onClick={previous}>
        <SkipPreviousRoundedIcon />
      </StyledRoundButton>
      <StyledRoundButton onClick={handlerPlay}>
        {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
      </StyledRoundButton>
      <StyledRoundButton onClick={next}>
        <SkipNextRoundedIcon />
      </StyledRoundButton>
      <SmallStyledRoundButton onClick={showQueue}>
        <QueueMusicRoundedIcon />
      </SmallStyledRoundButton>
    </Wrapper>
  );
};
export default PlayerControls;

const Wrapper = styled.div`
  width: 100vw;
  height: 65px;
  margin-top: 20px;
  z-index: 7;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledRoundButton = styled(Button)`
  margin: 0px 10px 0px 10px !important;

  height: 65px;
  width: 65px;
  border-radius: 100% !important;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  svg {
    font-size: 3rem;
    fill: #d8dee9;
  }
`;

const SmallStyledRoundButton = styled(Button)`

  height: 50px;
  width: 50px !important;
  min-width: 50px !important;
  border-radius: 100% !important;
  
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  svg {
    font-size: 2rem;
    fill: #6f788a;
  }
`;

