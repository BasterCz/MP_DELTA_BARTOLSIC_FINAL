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

export const PlayerStickyDown: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [commited, setCommited] = useState(-1);
  const [isSliderMoving, setIsSliderMoving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(1);
  const [audioBufferTime, setAudioBufferTime] = useState(1);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const fwdBtnRef = useRef<HTMLButtonElement>(null);
  const revBtnRef = useRef<HTMLButtonElement>(null);

  const toMinuteSecond = (num: number) => {
    return new Date(sliderValue *1000).toISOString().substr(14, 5)
  }

  const handleChangeSlider = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[],
  ) => {
    setIsSliderMoving(true);
    setSliderValue(value as number);
  };
  const handleChangeCommitSlider = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[],
  ) => {
    setCommited(value as number);
    setIsSliderMoving(false);
  };

  useLayoutEffect(() => {
    const handleAudio = () => {
      if (audioRef.current !== null) {
        if (!isPlaying) {
          setIsPlaying(true);
          audioRef.current.play();
        } else {
          setIsPlaying(false);
          audioRef.current.pause();
          setAudioTime(audioRef.current.duration);
        }
      }
    };
    const fastForward = () => {
      if (audioRef.current !== null) audioRef.current.currentTime += 5;
    };

    const revert = () => {
      if (audioRef.current !== null) audioRef.current.currentTime -= 5;
    };

    const setDurationH = () => {
      if (audioRef.current !== null) setAudioTime(audioRef.current.duration);
    };

    audioRef.current?.addEventListener("durationchange", setDurationH);
    playBtnRef.current?.addEventListener("click", handleAudio);
    revBtnRef.current?.addEventListener("click", revert);
    fwdBtnRef.current?.addEventListener("click", fastForward);
    return () => {
      audioRef.current?.removeEventListener("durationchange", setDurationH);
      playBtnRef.current?.removeEventListener("click", handleAudio);
      revBtnRef.current?.removeEventListener("click", revert);
      fwdBtnRef.current?.removeEventListener("click", fastForward);
    };
  }, [isPlaying]);

  useLayoutEffect(()=>{
    const setCurrentTimeH = () => {
      if (audioRef.current !== null) 
      {
        setAudioCurrentTime(audioRef.current.currentTime);
        if(audioRef.current!.buffered.length > 0) setAudioBufferTime(audioRef.current!.buffered.end(0));
        if (!isSliderMoving) setSliderValue(audioRef.current.currentTime);
        else if(commited !== -1) {
          audioRef.current.currentTime =commited;
          setCommited(-1);
        }
      }
    };
    setCurrentTimeH();
    const currentTimeH = setInterval(()=>{
      setCurrentTimeH();
      },1000)
      return () => clearInterval(currentTimeH)
  }, [isSliderMoving, commited])

  return (
    <Wrapper>
      <audio
        ref={audioRef}
        src="https://cloud-object-storage-s5-cos-standard-4m2.s3.eu-de.cloud-object-storage.appdomain.cloud/Titanium.mp3"
      />
      <PlayerWrapper>
        <TopDiv>
          <ButtonGroupDiv>
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
        <SCard>
          <MidDiv>
            <Title>Lorem ipsum dolor sit amet</Title>
          </MidDiv>
          <BottomDiv>
            <CustomSliderDiv>
              <LeftTime>{new Date(audioCurrentTime *1000).toISOString().substr(14, 5)}</LeftTime>
              <CustomBuffer
                variant="buffer"
                value={audioCurrentTime*100/audioTime}
                valueBuffer={audioBufferTime*100/audioTime + 10}
                
              />
              <RightTime>{new Date(audioTime *1000).toISOString().substr(14, 5)}</RightTime>
              <CustomSlider valueLabelDisplay="auto" valueLabelFormat={toMinuteSecond} ref={sliderRef} min={0} max={audioTime} value={sliderValue} onChange={handleChangeSlider} onChangeCommitted={handleChangeCommitSlider} />
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
  bottom: 0px;
  left: 0px;
`;
const PlayerWrapper = styled.div`
  width: 100vw;
  height: 146px;
`;
const SCard = styled(Card)`
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: 106px;
  background-color: rgb(41, 46, 57);
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
    max-width: 65px;
    max-height: 65px;
    min-width: 65px;
    min-height: 65px;
  }
  .btn-smaller svg {
    fill: rgb(41, 46, 57);
    font-size: 2rem;
  }
  .btn-bigger {
    max-width: 80px;
    max-height: 80px;
    min-width: 80px;
    min-height: 80px;
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
