import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApollo, useApollo } from "../lib/apollo";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { Context } from "../lib/context";
import Head from "next/head";
import NavLayout from "../components/layouts/navLayout";
import PlayerCard from "../components/player/playerCard";
import ReactPlayer from "react-player";
import { PlayerContext } from "../lib/contextPlayer";
import CustomPlayer from "../components/player/CustomPlayer";

type SelectedType = "feed" | "search" | "library";
type DetailOfType = "song" | "playlist";
type ReactPlayerState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();

  const [maximized, setMaximized] = useState(true);
  const [playerControlMini, setPlayerControlMini] = useState(true);

  const [selected, setSelected] = useState<SelectedType>("feed");
  const [detailOf, setDetailOf] = useState<DetailOfType>("song");

  const [detailID, setDetailID] = useState("");

  const [detailVisible, setDetailVisible] = useState(false);
  const [playerMiniVisible, setPlayerMiniVisible] = useState(true);
  const [playerVisible, setPlayerVisible] = useState(false);

  const [waveform, setWavefrom] = useState<number[]>([]);
  const [playTitle, setPlayTitle] = useState("");
  const [playFileOne, setPlayFileOne] = useState("http://192.168.2.19:3000");
  const [playFileTwo, setPlayFileTwo] = useState("http://192.168.2.19:3000");
  const [playImage, setPlayImage] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [commited, setCommited] = useState(-1);
  const [isSliderMoving, setIsSliderMoving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTimeOne, setAudioTimeOne] = useState(1);
  const [audioTimeTwo, setAudioTimeTwo] = useState(1);
  const [audioBufferTime, setAudioBufferTime] = useState(1);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [activePlayer, setActivePlayer] = useState(1);

  const audioRefOne = useRef<ReactPlayer>(null);
  const audioRefTwo = useRef<ReactPlayer>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const fwdBtnRef = useRef<HTMLButtonElement>(null);
  const revBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelected(
      router.pathname.substring(
        router.pathname.lastIndexOf("/") + 1
      ) as SelectedType
    );
  }, [router.pathname]);

  const handlerMenuClick = () => {
    setMaximized(!maximized);
  };
  const handlerDetailClose = () => {
    setDetailVisible(!detailVisible);
  };
  const handlerMinifyPlayer = () => {
    setPlayerControlMini(!playerControlMini);
  };
  const handlerPlay = () => {
    setIsPlaying(!isPlaying);
  }
  const handlerVisibilityPlayer = () => {
    setPlayerMiniVisible(!playerMiniVisible);
    setPlayerVisible(!playerVisible);
    setDetailVisible(false);
  };
  const handlerChangeSelected = (input: SelectedType) => {
    setSelected(input);
  };
  const handlerResultClick = (_id: string, _detailOf: DetailOfType) => {
    setDetailOf(_detailOf);
    setDetailID(_id);
    setDetailVisible(!detailVisible);
  };

  const handlerPreload = (fileSrc: string) => {
    if(activePlayer === 0) {
      setPlayFileTwo("http://192.168.2.19:3000" + fileSrc);
    }
    else {
      setPlayFileOne("http://192.168.2.19:3000" + fileSrc);
    }
    console.log(playFileOne, playFileTwo);
  }

  const handlerStartPlayer = (
    waveform: number[],
    title: string,
    imageSrc: string,
  ) => {
    if(activePlayer === 0 ) setActivePlayer(1);
    else setActivePlayer(0);
    setWavefrom(waveform);
    setPlayTitle(title);
    setPlayImage(imageSrc);
    setPlayerMiniVisible(false);
    setPlayerVisible(true);
    setDetailVisible(false);
    setIsPlaying(true);
    console.log(activePlayer)
  };

  return (
    <ApolloProvider client={apolloClient}>
      <Context.Provider
        value={{ detailID, handlerResultClick, handlerStartPlayer, handlerPreload }}
      >
        <PlayerContext.Provider
          value={{
            setIsSliderMoving,
            setSliderValue,
            setCommited,
            setIsPlaying,
            setAudioTimeOne,
            setAudioTimeTwo,
            setAudioCurrentTime,
            setAudioBufferTime,
            setWavefrom,
            setActivePlayer,
            sliderValue,
            audioRefOne,
            audioRefTwo,
            playBtnRef,
            sliderRef,
            fwdBtnRef,
            revBtnRef,
            isPlaying,
            playFileOne,
            playFileTwo,
            isSliderMoving,
            commited,
            audioTimeOne,
            audioTimeTwo,
            audioCurrentTime,
            audioBufferTime,
            waveform,
            activePlayer,
            handlerPlay,
          }}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Heebo:wght@500&family=Kanit:wght@800&family=Kanit:wght@600&family=Varela+Round&display=swap"
              rel="stylesheet"
            />
          </Head>
          <CustomPlayer/>
          {playerVisible ? (
            <PlayerCard
              handlerVisibilityPlayer={handlerVisibilityPlayer}
              playImage={playImage}
              playTitle={playTitle}
            />
          ) : null}
          <NavLayout
            maximized={maximized}
            handlerMenuClick={handlerMenuClick}
            selected={selected}
            handlerChangeSelected={handlerChangeSelected}
            handlerDetailClose={handlerDetailClose}
            playerControlMini={playerControlMini}
            handlerMinifyPlayer={handlerMinifyPlayer}
            detailOf={detailOf}
            detailID={detailID}
            handlerVisibilityPlayer={handlerVisibilityPlayer}
            playerMiniVisible={playerMiniVisible}
            title={
              selected === "feed"
                ? "Home"
                : selected === "search"
                ? "Search"
                : "Library"
            }
            detailVisible={detailVisible}
          >
            <Component {...pageProps} />
          </NavLayout>
        </PlayerContext.Provider>
      </Context.Provider>
    </ApolloProvider>
  );
}
export default MyApp;
