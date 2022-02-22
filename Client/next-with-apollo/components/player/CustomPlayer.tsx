import React, { SyntheticEvent, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { PlayerContext } from "../../lib/contextPlayer";

type ReactPlayerState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

export const CustomPlayer: React.FC = () => {
  const {
    audioRef,
    audioBufferTime,
    audioTime,
    fwdBtnRef,
    playBtnRef,
    revBtnRef,
    sliderRef,
    sliderValue,
    playFile,
    commited,
    isPlaying,
    audioCurrentTime,
    isSliderMoving,
    setCommited,
    setIsPlaying,
    setIsSliderMoving,
    setSliderValue,
    setAudioCurrentTime,
    setAudioBufferTime,
    setAudioTime,
  } = useContext(PlayerContext);
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

  

  useEffect(() => {
    if (commited !== -1 && audioRef.current !== null) {
      audioRef.current.seekTo(commited);
      setCommited(-1);
    }
  }, [commited]);

  useEffect(() => {
    if (audioRef.current !== null) setIsPlaying(true);
  }, [playFile]);
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
        config={playFile.includes(".m3u8") ? { file: { forceHLS: true } } : {}}
        ref={audioRef}
        playing={isPlaying}
        url={playFile}
        onDuration={handleDuration}
        onProgress={progressHandler}
        height={0}
        width={0}
      />
    </Wrapper>
  );
};
export default CustomPlayer;

const Wrapper = styled.div`
  width: 100vw;
  height: 5px;
  z-index: 7;
`;
