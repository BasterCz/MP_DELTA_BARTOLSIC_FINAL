import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { PlayerContext } from "../../lib/contextPlayer";

export const PlayerControls: React.FC = () => {
    const {audioRef, fwdBtnRef, revBtnRef, isPlaying, handlerPlay} = useContext(PlayerContext);
    useEffect(() => {
        const fastForward = () => {
          if (audioRef.current !== null)
            audioRef.current.seekTo(audioRef.current.getCurrentTime() + 5);
        };
    
        const revert = () => {
          if (audioRef.current !== null)
            audioRef.current.seekTo(audioRef.current.getCurrentTime() - 5);
        };
    
        revBtnRef.current?.addEventListener("click", revert);
        fwdBtnRef.current?.addEventListener("click", fastForward);
        return () => {
          revBtnRef.current?.removeEventListener("click", revert);
          fwdBtnRef.current?.removeEventListener("click", fastForward);
        };
      }, [isPlaying]);


  return (
    <Wrapper>
      <StyledRoundButton ref={revBtnRef}><FastRewindRoundedIcon/></StyledRoundButton>
      <StyledRoundButton onClick={handlerPlay}>{isPlaying?<PauseRoundedIcon/>:<PlayArrowRoundedIcon/>}</StyledRoundButton>
      <StyledRoundButton ref={fwdBtnRef}><FastForwardRoundedIcon/></StyledRoundButton>
    </Wrapper>
  );
};
export default PlayerControls;

const Wrapper = styled.div`
  width: 100vw;
  height: 65px;

  z-index: 7;
  display: flex;
  justify-content: center;
`;
const StyledRoundButton = styled(Button)`
  margin: 0px 10px 0px 10px !important;
  background-color: #d8dee9 !important;
  height: 65px;
  width: 65px;
  border-radius: 100% !important;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  svg {
      font-size: 2rem;
  }
`;
