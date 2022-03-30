import { Button, ButtonGroup, Card, IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import React, { useContext } from "react";
import styled from "styled-components";
import { PlayerContext } from "../../lib/contextPlayer";

type PlayerSmallProps = {
    handlerMinifyPlayer: () => void;
    handlerVisibilityPlayer: () => void; 
  playerControlMini: boolean;
}

export const PlayerSmall: React.FC<PlayerSmallProps> = ({handlerMinifyPlayer,handlerVisibilityPlayer, playerControlMini}) => {
  const { handlerPlay, isPlaying, audioInstance, songQueue } = useContext(PlayerContext);
const next = () => {
  if(audioInstance.current && audioInstance.current.playNext) audioInstance.current.playNext();
}
const previous = () => {
  if(audioInstance.current && audioInstance.current.playPrev) audioInstance.current.playPrev();
}
const mute = () => {
  if(audioInstance.current) audioInstance.current.volume = (audioInstance.current.volume === 0? 1 : 0);
}
  return (
    <Wrapper style={{width: (playerControlMini? "85px" :"270px")}}>
      {playerControlMini ? (
        <MinWrapper>
          <SButtonGroup>
            <SButton onClick={handlerMinifyPlayer}>
              <ArrowBackIosNewRoundedIcon className="show" />
            </SButton>
            <SButton onClick={handlerPlay}>
              {isPlaying?<PauseRoundedIcon className="play"/>:<PlayArrowRoundedIcon className="play" />}
            </SButton>
          </SButtonGroup>
        </MinWrapper>
      ) : (
        <MaxWrapper>
            <SButton onClick={handlerMinifyPlayer}>
              <ArrowForwardIosRoundedIcon className="show" />
            </SButton>
            <SButtonGroup>
            <SButton onClick={previous}>
              <SkipPreviousRoundedIcon className="fastb" />
            </SButton>
            <SButton onClick={handlerPlay}>
            {isPlaying?<PauseRoundedIcon className="play"/>:<PlayArrowRoundedIcon className="play" />}
            </SButton>
            <SButton onClick={next}>
              <SkipNextRoundedIcon className="fastf" />
            </SButton>
            <SButton className={audioInstance.current && audioInstance.current.volume === 0? "muted" : ""} onClick={mute}>
              <VolumeOffRoundedIcon className="mute" />
            </SButton>
            <SButton disabled={songQueue.length === 0} onClick={handlerVisibilityPlayer}>
              <LaunchRoundedIcon className="more" />
            </SButton>
          </SButtonGroup>
        </MaxWrapper>
      )}
    </Wrapper>
  );
};
export default PlayerSmall;

const Wrapper = styled.div`
  position: absolute;
  
  right: 0px;
  z-index: 6;
`;

const MinWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-right: 5px;
  background-color: #c7cdda;
  border-start-start-radius: 15px;
  border-end-start-radius: 15px;
  border-start-end-radius: 0px;
  border-end-end-radius: 0px;
`;

const MaxWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #c7cdda;
  border-start-start-radius: 15px;
  border-end-start-radius: 15px;
  border-start-end-radius: 0px;
  border-end-end-radius: 0px;
`;

const SButtonGroup = styled(ButtonGroup)`
  display: flex;
  height: 50px;
  .muted {
    background-color: #1976d2;
    svg {
      fill: #c7cdda
    }
  }
`;

const SButton = styled(Button)`
  border: none;
  padding: 1px;
  :hover {
    border: none;
  }
  .show {
    font-size: 1.1rem;
  }
  .play {
    font-size: 1.5rem;
  }
  .more {
    font-size: 1.5rem;
  }
  
`;
