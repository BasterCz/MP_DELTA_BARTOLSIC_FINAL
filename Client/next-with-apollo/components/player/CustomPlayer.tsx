import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
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
    audioRefOne,
    audioRefTwo,
    audioBufferTime,
    audioTimeOne,
    audioTimeTwo,
    fwdBtnRef,
    playBtnRef,
    revBtnRef,
    sliderRef,
    sliderValue,
    playFileOne,
    playFileTwo,
    commited,
    isPlaying,
    activePlayer,
    audioCurrentTime,
    isSliderMoving,
    setCommited,
    setIsPlaying,
    setIsSliderMoving,
    setSliderValue,
    setAudioCurrentTime,
    setAudioBufferTime,
    setAudioTimeOne,
    setAudioTimeTwo,
    setActivePlayer
  } = useContext(PlayerContext);

  const [isSafari, setIsSafari] = useState(false);

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
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  });

  useEffect(() => {
    // if (commited !== -1 && audioRef.current !== null) {
    //   audioRef.current.seekTo(commited);
    //   setCommited(-1);
    // }
  }, [commited]);

  const progressHandler = (state: ReactPlayerState) => {
    setAudioCurrentTime(state.playedSeconds);
    if (!isSliderMoving) setSliderValue(state.playedSeconds);
    setAudioBufferTime(state.loadedSeconds);
    console.log(activePlayer === 0? audioTimeOne - state.playedSeconds: audioTimeTwo - state.playedSeconds);
    if(activePlayer === 1 && audioTimeTwo - state.playedSeconds < 1) setActivePlayer(0);
    else if (activePlayer === 0 && audioTimeOne - state.playedSeconds < 1) setActivePlayer(1);
  };

  const handleDuration = (duration: number, player: number) => {
    if (player === 0) {
    setAudioTimeOne(duration);
    }
    else {
      setAudioTimeTwo(duration);
    }
    console.log("loaded", player, "duration", duration, audioTimeOne);
  };

  return (
    <Wrapper>
      <ReactPlayer
      key="player1"
        config={{ file: { forceHLS: false, forceAudio: true } }}
        ref={audioRefOne}
        playing={activePlayer === 0 ? isPlaying : false}
        url={playFileOne}
        onDuration={(dur) => handleDuration(dur, 0)}
        onProgress={progressHandler}
        height={1}
        width={1}
      />
      <ReactPlayer
      key="player2"
        config={{ file: { forceHLS: false, forceAudio: true } }}
        ref={audioRefTwo}
        playing={activePlayer === 1 ? isPlaying : false}
        url={playFileTwo}
        onDuration={(dur) => handleDuration(dur, 1)}
        onProgress={progressHandler}
        height={1}
        width={1}
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
