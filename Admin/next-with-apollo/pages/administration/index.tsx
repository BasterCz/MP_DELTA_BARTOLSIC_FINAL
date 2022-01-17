import type { NextPage } from "next";
import * as React from "react";
import EnhancedTableSong from "../../components/Administration/tableSong/SongsTable";
import EnhancedTablePlaylist from "../../components/Administration/tablePlaylist/PlaylistsTable";
import { useRef, useState } from "react";
import styled from "styled-components";
import PlayerStickyDown from "../../components/Administration/player/PlayerStickyDown";
import ReactPlayer from "react-player";
import { ThemeProvider } from "@mui/material";
import { palette } from "../../styles/palette";

type SettersType = {
  setShowSongTable: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayingName: React.Dispatch<React.SetStateAction<string>>;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
  setSmallPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  smallPlayer: boolean;
};

const AdminSongList: NextPage = () => {
  const [showSongTable, setShowSongTable] = useState(true);
  const [playingName, setPlayingName] = useState("");
  const audioRef = useRef<ReactPlayer>(null);
  const [src, setSrc] = useState("");
  const [smallPlayer, setSmallPlayer] = React.useState(false);

  const setters: SettersType = {
    setShowSongTable,
    setPlayingName,
    setSrc,
    setSmallPlayer,
    smallPlayer,
  };

  return (
    <ThemeProvider theme={palette}>
      <Wrapper>
        {showSongTable ? (
          <EnhancedTableSong setters={setters} />
        ) : (
          <EnhancedTablePlaylist setters={setters} />
        )}
        <PlayerStickyDown
          name={playingName}
          audioRef={audioRef}
          src={src}
          small={smallPlayer}
        />
      </Wrapper>
    </ThemeProvider>
  );
};

export default AdminSongList;

const Wrapper = styled.div`
width: calc(100vw - 7px);
`;
