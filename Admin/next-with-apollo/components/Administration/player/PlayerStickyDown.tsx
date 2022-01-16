import {
  Button,
  Card,
  LinearProgress,
  Slider,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import ReactPlayer from "react-player";

type PlayerStickyDownProps = {
  audioRef: React.RefObject<ReactPlayer>;
  name: string;
  src: string;
  small: boolean;
};

type ReactPlayerState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

export const PlayerStickyDown: React.FC<PlayerStickyDownProps> = ({
  audioRef,
  name = "",
  src,
  small,
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [commited, setCommited] = useState(-1);
  const [isSliderMoving, setIsSliderMoving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(1);
  const [audioBufferTime, setAudioBufferTime] = useState(1);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const playBtnRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const fwdBtnRef = useRef<HTMLButtonElement>(null);
  const revBtnRef = useRef<HTMLButtonElement>(null);

  const toMinuteSecond = (num: number) => {
    return new Date(sliderValue * 1000).toISOString().substr(14, 5);
  };

  const handleChangeSlider = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    setIsSliderMoving(true);
    setSliderValue(value as number);
  };
  const handleChangeCommitSlider = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    setCommited(value as number);
    setIsSliderMoving(false);
  };

  useLayoutEffect(() => {
    const handleAudio = () => {
      if (!isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };
    const fastForward = () => {
      if (audioRef.current !== null)
        audioRef.current.seekTo(audioRef.current.getCurrentTime() + 5);
    };

    const revert = () => {
      if (audioRef.current !== null)
        audioRef.current.seekTo(audioRef.current.getCurrentTime() - 5);
    };

    playBtnRef.current?.addEventListener("click", handleAudio);
    revBtnRef.current?.addEventListener("click", revert);
    fwdBtnRef.current?.addEventListener("click", fastForward);
    return () => {
      playBtnRef.current?.removeEventListener("click", handleAudio);
      revBtnRef.current?.removeEventListener("click", revert);
      fwdBtnRef.current?.removeEventListener("click", fastForward);
    };
  }, [isPlaying]);

  useLayoutEffect(() => {
    if (commited !== -1 && audioRef.current !== null) {
      audioRef.current.seekTo(commited);
      setCommited(-1);
    }
  }, [commited]);

  useLayoutEffect(() => {
    console.log(src);
    if (audioRef.current !== null) setIsPlaying(true);
  }, [src]);

  const progressHandler = (state: ReactPlayerState) => {
    setAudioCurrentTime(state.playedSeconds);
    if (!isSliderMoving) setSliderValue(state.playedSeconds);
    setAudioBufferTime(state.loadedSeconds);
  };

  const handleDuration = (duration: number) => {
    if (audioRef.current !== null) setAudioTime(audioRef.current.getDuration());
  };

  return (
    <Wrapper>
      <ReactPlayer
        config={src.includes(".m3u8") ? { file: { forceHLS: true } } : {}}
        ref={audioRef}
        playing={isPlaying}
        url={src}
        onDuration={handleDuration}
        onProgress={progressHandler}
        height={0}
        width={0}
      />
      <PlayerWrapper className={small? "smaller" : ""}>
        <TopDiv className={"topDiv"}>
          <ButtonGroupDiv className={small? "smallerTop" : ""}>
            <StyledRoundButton ref={revBtnRef} className="btn-smaller">
              <FastRewindRoundedIcon />
            </StyledRoundButton>
            <StyledRoundButton ref={playBtnRef} className="btn-bigger">
              {!isPlaying ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
            </StyledRoundButton>
            <StyledRoundButton ref={fwdBtnRef} className="btn-smaller">
              <FastForwardRoundedIcon />
            </StyledRoundButton>
          </ButtonGroupDiv>
        </TopDiv>
        <SCard className={small? "smallerCard" : ""}>
          {!small ? (
            <MidDiv>
              <Title>{name}</Title>
            </MidDiv>
          ) : null}

          <BottomDiv>
            <CustomSliderDiv>
              <LeftTime>
                {new Date(audioCurrentTime * 1000).toISOString().substr(14, 5)}
              </LeftTime>
              <CustomBuffer
                variant="buffer"
                value={(audioCurrentTime * 100) / audioTime}
                valueBuffer={(audioBufferTime * 100) / audioTime + 10}
              />
              <RightTime>
                {new Date(audioTime * 1000).toISOString().substr(14, 5)}
              </RightTime>
              <CustomSlider
                valueLabelDisplay="auto"
                valueLabelFormat={toMinuteSecond}
                ref={sliderRef}
                min={0}
                max={audioTime}
                value={sliderValue}
                onChange={handleChangeSlider}
                onChangeCommitted={handleChangeCommitSlider}
              />
            </CustomSliderDiv>
          </BottomDiv>
        </SCard>
      </PlayerWrapper>
    </Wrapper>
  );
};
export default PlayerStickyDown;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0px;
  left: 0px;
  .smaller {
    height:110px;
  }
  .smaller .topDiv {
    height:60px;
  }
  .smaller .smallerCard {
    height:65px;
  }

  .smaller .smallerTop .btn-smaller {
    height: inherit;
  }
  .smaller .smallerTop .btn-smaller {
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
  }
  .smaller .smallerTop .btn-smaller svg {
    font-size: 1.7rem;
  }
  .smaller .smallerTop .btn-bigger {
    max-width: 60px;
    max-height: 60px;
    min-width: 60px;
    min-height: 60px;
  }
  .smaller .smallerTop .btn-bigger svg {
    font-size: 2.5rem;
  }
`;
const PlayerWrapper = styled.div`
  width: 100vw;
  height: 146px;
  
`;
const SCard = styled(Card)`
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: 96px;
  background-color: #001e3c;
  border-radius: 30px 30px 0px 0px;
`;
const TopDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 80px;
`;
const ButtonGroupDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 80px;
  display: inline-flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  .btn-smaller {
    max-width: 60px;
    max-height: 60px;
    min-width: 60px;
    min-height: 60px;
  }
  .btn-smaller svg {
    fill: rgb(41, 46, 57);
    font-size: 2rem;
  }
  .btn-bigger {
    max-width: 70px;
    max-height: 70px;
    min-width: 70px;
    min-height: 70px;
  }
  .btn-bigger svg {
    fill: rgb(41, 46, 57);
    font-size: 3rem;
  }
`;
const MidDiv = styled.div`
  position: absolute;
  bottom: 36px;
  width: calc(100vw);
  height: 30px;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
`;
const BottomDiv = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 36px;
`;

const StyledRoundButton = styled(Button)`
  margin: 0px 7px 0px 7px;
  background-color: #d8dee9;
  max-width: 61px;
  max-height: 61px;
  min-width: 61px;
  min-height: 61px;
  border-radius: 100%;
  transform: translate(0px, 0px);
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  :hover {
    background-color: #d8dee9;
  }
  .dropdown {
    font-size: 3rem !important;
    fill: #d8dee9;
  }
  .iconDark {
    font-size: 1.9rem !important;
    fill: #4c566a;
  }
`;

const CustomSliderDiv = styled.div`
  width: calc(100% - 10px);
  margin: auto 5px auto 5px;
  height: 100%;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  align-items: center;
  justify-items: center;
`;

const CustomSlider = styled(Slider)`
  width: 95%;
  height: 100%;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  color: transparent;
  & .MuiSlider-thumb {
    color: #88c0d0;
  }
`;
const CustomBuffer = styled(LinearProgress)`
  width: 95%;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
const LeftTime = styled(Typography)`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
`;
const RightTime = styled(Typography)`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
`;
const Title = styled(Typography)``;
