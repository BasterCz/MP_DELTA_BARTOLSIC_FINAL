import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DetailCardWrapper from "./detailCardWrapper";
import { useSongOne, useSongPlaylists } from "../hooks/useSongs";
import DetailTitle from "../typography/detailTitle";
import ControlsDetailSong from "./controlsSong";
import OptionsDetailSong from "./optionListSong";
import { Context } from "../../lib/context";
import { useWaveform, useWaveforms } from "../hooks/useWaveform";
import { usePlaylistOne } from "../hooks/usePlaylist";
import { Box, Button, ButtonGroup } from "@mui/material";
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ControlsDetailPlaylist from "./controlsPlaylist";


const imageSize = "250px";

type DetailCardWrapperProps = {
  handlerDetailClose: () => void;
  detailVisible: boolean;
  _id: string;
};

type SongInfo = {
  id: string;
  name: string;
  singer: string;
  cover: string;
  musicSrc: string;
};


export const DetailCardPlaylist: React.FC<DetailCardWrapperProps> = ({
  _id,
  detailVisible,
  handlerDetailClose,
}) => {
  const [isReady, setIsReady] = useState(false);
  const { playlist, songs, refetchPlaylist, refetchSongs } = usePlaylistOne(
    _id,
    isReady
  );

  const { waveforms } = useWaveforms(playlist?.songs as string[]);
  const [songPreQueue, setSongPreQueue] = useState<SongInfo[]>([])
  const [imagePath, setImagePath] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selected, setSelected] = useState(true);

  const { handlerStartPlaylistPlayer, handlerAddPlaylistToQueue,  handlerResultClick} = useContext(Context);

  const handlerSelectList = () => {
    setSelected(true);
  }

  const handlerSelectOptions = () => {
    setSelected(false);
  }

  useEffect(() => {
    setIsReady(detailVisible);
  }, [detailVisible]);

  useEffect(() => {
    refetchPlaylist({ _id });
    refetchSongs({ _id });
  }, [_id]);

  useEffect(() => {
    
    if (playlist) {
      if (playlist.image_path !== undefined)
        setImagePath("http://localhost:3000" + playlist.image_path);
      if (playlist.name !== undefined) setTitle(playlist.name);
      if (playlist.name !== undefined) setID(playlist._id);
    }
  }, [playlist]);

  useEffect(() => {
    
    if (songs) {
      setSongPreQueue(songs.map(song => { 
        return {id: song?._id! + Date.now(), name: song?.name!, singer: "Koinonia", cover: "http://localhost:3000" + song?.image_path!, musicSrc: "http://localhost:3000" + song?.file_path!}
      }))
    }
  }, [songs]);

  return (
    <Wrapper>
      <DetailCardWrapper handlerDetailClose={handlerDetailClose}>
        <ImagePlace>
          {imagePath !== "" ? (
            <SImage src={imagePath} height={imageSize} width={imageSize} />
          ) : null}
        </ImagePlace>
        <ControlsDetailPlaylist
          startPlayer={() => {
            if(waveforms) handlerStartPlaylistPlayer(waveforms, songPreQueue);
          }}
          addToQueue={() => {
            if(waveforms) handlerAddPlaylistToQueue(waveforms, songPreQueue)
          }}
        />
        <DetailTitle>{playlist?.name}</DetailTitle>
      <SongWrapper>
          {songs
            ? songs.map((song) => {return(
                <ItemWrapper onClick={()=>{handlerResultClick(song!._id, "song")}}>
                  <ImagePlaceSmall>
                    <SImageSmall
                      src={"http://localhost:3000" + song!.image_path}
                      height={"61px"}
                      width={"61px"}
                    />
                  </ImagePlaceSmall>
                  <TextP>{song!.name}</TextP>
                </ItemWrapper>)
              })
            : <></>}
        </SongWrapper>
        
      </DetailCardWrapper>
    </Wrapper>
  );
};
export default DetailCardPlaylist;

const Wrapper = styled.div`
  z-index: 3;
  width: 100vw;
  height: 87vh;
`;

const SongWrapper = styled.div`
width: 95%;
display: flex;
flex-direction: column;
`;

const SButtonGroup = styled(ButtonGroup)`
  margin-bottom: 10px;
  border: none;
  button { 
    border: none;
    background-color: rgba(0,0,0,0.17);
  }
  .selected {
    border: 1px solid #d8dee9;
  }
`

const ImagePlace = styled.div`
  background-color: #d8dee9;
  width: ${imageSize};
  height: ${imageSize};
  min-width: ${imageSize};
  min-height: ${imageSize};
  border-radius: 10px;
  margin: 20px;
  margin-top: 0px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;

const SImage = styled(Image)`
  border-radius: 10px;
`;

const SImageSmall = styled(Image)`
  border-radius: 5px;
`;

const ImagePlaceSmall = styled.div`
  background-color: #d8dee9;
  width: 52px;
  height: 52px;
  border-radius: 5px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;

const ItemWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 7px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  align-items: center;
`;

const TextP = styled(Box)`
  color: #d8dee9;
  margin-left: 10px;
  font-size: 1.1rem;
  width: calc(100% - 70px);
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 95%, transparent);
  div {
    min-width: 20px;
    height: 27px;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
