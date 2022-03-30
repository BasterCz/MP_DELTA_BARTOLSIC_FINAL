import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo";
import React, { useEffect, useRef, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { Context } from "../lib/context";
import Head from "next/head";
import NavLayout from "../components/layouts/navLayout";
import PlayerCard from "../components/player/playerCard";
import { PlayerContext } from "../lib/contextPlayer";
import CustomPlayer from "../components/player/CustomPlayer";
import { ReactJkMusicPlayerInstance } from "react-jinke-music-player";
import useStateCallback from "../components/hooks/useStateCallback";

import { UserContext, UserProvider, useUser } from "@auth0/nextjs-auth0";

type SelectedType = "feed" | "search" | "library";
type DetailOfType = "song" | "playlist";
type ReactPlayerState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};
type SongInfo = {
  id: string;
  name: string;
  singer: string;
  cover: string;
  musicSrc: string;
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
  const [queueVisible, setQueueVisible] = useState(false);

  const [sliderValue, setSliderValue] = useState(0);
  const [commited, setCommited] = useState(-1);
  const [isSliderMoving, setIsSliderMoving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(1);
  const [audioBufferTime, setAudioBufferTime] = useState(1);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const [songQueue, setSongQueue] = useState<SongInfo[]>([]);
  const [waveformQueue, setWaveformQueue] = useStateCallback<number[][]>([]);
  const [songIndex, setSongIndex] = useState(0);
  const [indexToPlay, setIndexToPlay] = useState(0);
  const [removed, setRemoved] = useStateCallback(false);
  const [removedNo, setRemovedNo] = useStateCallback(0);

  const [userContext, setUserContext] = useState<UserContext | null>(null);

  const audioInstance = useRef<ReactJkMusicPlayerInstance | null>(null);
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
  };
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
    setDetailVisible(true);
  };

  useEffect(() => {
    if (audioInstance.current !== null) {
      isPlaying ? audioInstance.current.play() : audioInstance.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (removed) {
      if (audioInstance.current && audioInstance.current.play)
        audioInstance.current.load();
    } else {
      if (audioInstance.current && audioInstance.current.playNext)
        audioInstance.current.playNext();
    }
  }, [indexToPlay, removed, removedNo]);

  const handlerStartPlayer = (
    id: string,
    waveform: number[],
    title: string,
    imageSrc: string,
    audioSrc: string
  ) => {
    if (songQueue.length > 0) {
      var removed = false;
      setSongQueue(() => {
        var helperArray = [...songQueue];

        helperArray.splice(songIndex + 1, 0, {
          id: id + Date.now(),
          name: title,
          singer: "Admin",
          cover: imageSrc,
          musicSrc: audioSrc,
        });
        return helperArray;
      });
      setWaveformQueue(() => {
        var helperArray = [...waveformQueue];
        helperArray.splice(songIndex + 1, 0, waveform);
        return helperArray;
      });

      setPlayerMiniVisible(false);
      setPlayerVisible(true);
      setDetailVisible(false);
      setIsPlaying(true);
      setIndexToPlay(removed ? songIndex : songIndex + 1);
      setRemoved(removed);
      setRemovedNo(removed ? removedNo + 1 : removedNo);
    } else {
      setSongQueue([
        ...songQueue,
        {
          id: id + Date.now(),
          name: title,
          singer: "Admin",
          cover: imageSrc,
          musicSrc: audioSrc,
        },
      ]);
      setWaveformQueue([...waveformQueue, waveform]);
      setPlayerMiniVisible(false);
      setPlayerVisible(true);
      setDetailVisible(false);
      setIsPlaying(true);
    }
  };

  const handlerStartPlaylistPlayer = (
    waveforms: number[][],
    songsQueue: SongInfo[]
  ) => {
    if (songQueue.length > 0) {
      setSongQueue(() => {
        var helperArray = [...songQueue];
        helperArray.splice(songIndex + 1, 0, ...songsQueue);
        return helperArray;
      });
      setWaveformQueue(() => {
        var helperArray = [...waveformQueue];
        helperArray.splice(songIndex + 1, 0, ...waveforms);
        return helperArray;
      });

      setPlayerMiniVisible(false);
      setPlayerVisible(true);
      setDetailVisible(false);
      setIsPlaying(true);
    } else {
      setSongQueue([...songQueue, ...songsQueue]);
      setWaveformQueue([...waveformQueue, ...waveforms]);
      setPlayerMiniVisible(false);
      setPlayerVisible(true);
      setDetailVisible(false);
      setIsPlaying(true);
    }
  };

  const handlerAddSongToQueue = (
    id: string,
    waveform: number[],
    title: string,
    imageSrc: string,
    audioSrc: string
  ) => {
    setSongQueue(() => {
      var removed = false;
      var helperArray = [...songQueue];
      helperArray.push({
        id: id + Date.now(),
        name: title,
        singer: "Admin",
        cover: imageSrc,
        musicSrc: audioSrc,
      });
      if (removed) setSongIndex(songIndex - 1);
      return helperArray;
    });
    setWaveformQueue(() => {
      var helperArray = [...waveformQueue];
      helperArray.push(waveform);
      return helperArray;
    });
  };

  const handlerAddPlaylistToQueue = (
    waveforms: number[][],
    songsQueue: SongInfo[]
  ) => {
    setSongQueue(() => {
      var helperArray = [...songQueue];
      helperArray.push(...songsQueue);
      return helperArray;
    });
    setWaveformQueue(() => {
      var helperArray = [...waveformQueue];
      helperArray.push(...waveforms);
      return helperArray;
    });
  };

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Context.Provider
          value={{
            detailID,
            queueVisible,
            playerVisible,
            userContext,
            setQueueVisible,
            handlerResultClick,
            handlerStartPlayer,
            handlerAddSongToQueue,
            handlerStartPlaylistPlayer,
            handlerAddPlaylistToQueue,
            setUserContext,
          }}
        >
          <PlayerContext.Provider
            value={{
              setIsSliderMoving,
              setSliderValue,
              setCommited,
              setIsPlaying,
              setAudioTime,
              setAudioCurrentTime,
              setAudioBufferTime,
              setSongQueue,
              setSongIndex,
              sliderValue,
              playBtnRef,
              sliderRef,
              fwdBtnRef,
              revBtnRef,
              isPlaying,
              isSliderMoving,
              commited,
              audioTime,
              audioCurrentTime,
              audioBufferTime,
              waveformQueue,
              songQueue,
              audioInstance,
              songIndex,
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
              <CustomPlayer />
              {playerVisible ? (
                <PlayerCard handlerVisibilityPlayer={handlerVisibilityPlayer} />
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
    </UserProvider>
  );
}
export default MyApp;
