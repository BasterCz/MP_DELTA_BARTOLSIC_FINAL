import { Button, ButtonGroup, Card, IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import React from "react";
import styled from "styled-components";

type PlayerSmallProps = {
    handlerMinifyPlayer: () => void;
    handlerVisibilityPlayer: () => void; 
  playerControlMini: boolean;
}

export const PlayerSmall: React.FC<PlayerSmallProps> = ({handlerMinifyPlayer,handlerVisibilityPlayer, playerControlMini}) => {
  return (
    <Wrapper style={{width: (playerControlMini? "85px" :"270px")}}>
      {playerControlMini ? (
        <MinWrapper>
          <SButtonGroup>
            <SButton onClick={handlerMinifyPlayer}>
              <ArrowBackIosNewRoundedIcon className="show" />
            </SButton>
            <SButton>
              <PlayArrowRoundedIcon className="play" />
            </SButton>
          </SButtonGroup>
        </MinWrapper>
      ) : (
        <MaxWrapper>
            <SButton onClick={handlerMinifyPlayer}>
              <ArrowForwardIosRoundedIcon className="show" />
            </SButton>
            <SButtonGroup>
            <SButton>
              <FastRewindRoundedIcon className="fastb" />
            </SButton>
            <SButton>
              <PlayArrowRoundedIcon className="play" />
            </SButton>
            <SButton>
              <FastForwardRoundedIcon className="fastf" />
            </SButton>
            <SButton>
              <VolumeOffRoundedIcon className="mute" />
            </SButton>
            <SButton onClick={handlerVisibilityPlayer}>
              <MoreVertRoundedIcon className="more" />
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
