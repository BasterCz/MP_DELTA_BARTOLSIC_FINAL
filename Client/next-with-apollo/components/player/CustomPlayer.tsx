import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { PlayerContext } from "../../lib/contextPlayer";
import Hls from "hls.js"
import {ReactJkMusicPlayerAudioInfo, ReactJkMusicPlayerInstance} from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css";
import dynamic from "next/dynamic";

type ReactPlayerState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const NoSSRPlayer = dynamic(() => import("./Player"), {
  ssr: false,
});

export const CustomPlayer: React.FC = () => {
  const {
    sliderValue,
    commited,
    isPlaying,
    isSliderMoving,
    songQueue,
    audioTime,
    audioInstance,
    songIndex,
    setCommited,
    setIsSliderMoving,
    setSliderValue,
    setAudioTime,
    setAudioCurrentTime,
    setAudioBufferTime,
    setSongIndex
  } = useContext(PlayerContext);

  
  const [isSafari, setIsSafari] = useState(false);
  const [isReady, setIsReady] = useState(false);

  

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
  }, []);

  const progressHandler = (state: ReactJkMusicPlayerAudioInfo) => {
    setAudioCurrentTime(state.currentTime);
    if (!isSliderMoving) setSliderValue(state.currentTime);
    if(audioInstance.current && audioInstance.current.buffered.length > 0) setAudioBufferTime(audioInstance.current.buffered.end(0));
    setAudioTime(state.duration);
  };
  

  return (
    <Wrapper>
      <SPlayer 
        preload="none"
        loadAudioErrorPlayNext={false}
        audioLists={songQueue}
        quietUpdate
        onAudioError={(e)=> {
          if(e && e.code === 4 && Hls.isSupported()) {
            const hlsInstance = new Hls();
            hlsInstance.loadSource(songQueue[songIndex].musicSrc);
            hlsInstance.attachMedia(audioInstance.current!)
          }
        }}
        onAudioProgress={progressHandler}
        getAudioInstance={(instance) => audioInstance.current = instance}
        onPlayIndexChange={(index)=> setSongIndex(index)}
        
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
const SPlayer = styled(NoSSRPlayer)`
  * {
    width: 1px !important;
    height: 1px !important;
    opacity: 0.000001 !important;
    padding: 0px !important;
    border: 0px !important;
  }
  * :before {
    width: 1px !important;
    height: 1px !important;
    opacity: 0.000001 !important;
    padding: 0px !important;
    border: 0px !important;
    /*CSS transitions*/
    -o-transition-property: none !important;
    -moz-transition-property: none !important;
    -ms-transition-property: none !important;
    -webkit-transition-property: none !important;
    transition-property: none !important;
    /*CSS transforms*/
    -o-transform: none !important;
    -moz-transform: none !important;
    -ms-transform: none !important;
    -webkit-transform: none !important;
    transform: none !important;
    /*CSS animations*/
    -webkit-animation: none !important;
    -moz-animation: none !important;
    -o-animation: none !important;
    -ms-animation: none !important;
    animation: none !important;
  }
`;
