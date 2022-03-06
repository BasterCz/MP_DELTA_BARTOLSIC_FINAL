import { Box, Button, Card, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DetailTitle from "../typography/detailTitle";
import Image from "next/image";
import PlayerControls from "./playerControl";
import Waveform from "./waveform";
import { PlayerContext } from "../../lib/contextPlayer";
import { ReactSortable } from "react-sortablejs";
import Sortable from 'sortablejs';

const imageSize = "300px";

interface ItemType {
    id: number;
    name: string;
  }

export const SongQueueList: React.FC = () => {


  const { waveformQueue, songIndex, songQueue, setSongQueue } =
    useContext(PlayerContext);
  return (
    <Wrapper>
      <ReactSortable list={songQueue} setList={setSongQueue} animation={200} easing="cubic-bezier(1, 0, 0, 1)">
      {songQueue.map((item, indexQ) => (
        <div key={item.id} style={{display: `${songIndex >= indexQ? "none" : "block"}`}}>
          <ItemWrapper >
            <ImagePlace >
              <SImage src={item.cover} height={"61px"} width={"61px"} />
            </ImagePlace>
            <TextP>
              {item.name}
            </TextP>
        </ItemWrapper>
        </div>
        
      ))}
    </ReactSortable>
    </Wrapper>
  );
};
export default SongQueueList;


const Wrapper = styled.div`
  z-index: 1;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  padding-top: 0px;
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

const SImage = styled(Image)`
  border-radius: 5px;
`;

const ImagePlace = styled.div`
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
`