import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DetailCardWrapper from "./detailCardWrapper";
import { useSongOne } from "../hooks/useSongs";
import DetailTitle from "../typography/detailTitle";
import ControlsDetailSong from "./controlsSong";
import OptionsDetailSong from "./optionListSong";
import { Context } from "../../lib/context";
import { useWaveform } from "../hooks/useWaveform";

const imageSize = "250px";

type DetailCardWrapperProps = {
  handlerDetailClose: () => void;
  detailVisible: boolean;
  _id: string;
};

export const DetailCardSong: React.FC<DetailCardWrapperProps> = ({
  _id,
  detailVisible,
  handlerDetailClose,
}) => {
  const [isReady, setIsReady] = useState(false);
  const { song, refetchSong } = useSongOne(_id, isReady);
  const { waveform, refetchWaveform } = useWaveform(_id);
  const [imagePath, setImagePath] = useState<string>("");
  const [audioPath, setAudioPath] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { handlerStartPlayer, handlerAddSongToQueue } = useContext(Context);

  useEffect(() => {
    setIsReady(detailVisible);
  }, [detailVisible]);

  useEffect(() => {
    refetchSong({ _id });
    refetchWaveform({ _id });
  }, [_id]);

  useEffect(() => {
    if (song) {
      if (song.image_path !== undefined)
        setImagePath("http://164.92.167.169:3000" + song.image_path);
      if (song.file_path !== undefined)
        setAudioPath("http://164.92.167.169:3000" + song.file_path);
      if (song.name !== undefined) setTitle(song.name);
      if (song.name !== undefined) setID(song._id);
    }
  }, [song]);

  return (
    <Wrapper>
      <DetailCardWrapper handlerDetailClose={handlerDetailClose}>
        <ImagePlace>
          {imagePath !== "" ? (
            <SImage src={imagePath} height={imageSize} width={imageSize} />
          ) : null}
        </ImagePlace>
        <ControlsDetailSong
          startPlayer={() => {
            handlerStartPlayer(ID, waveform!, title, imagePath, audioPath);
          }}
          addToQueue={() =>
            handlerAddSongToQueue(ID, waveform!, title, imagePath, audioPath)
          }
          id={ID}
        />
        <DetailTitle>{song?.name}</DetailTitle>
        <OptionsDetailSong songID={ID} imagePath={imagePath}/>
      </DetailCardWrapper>
    </Wrapper>
  );
};
export default DetailCardSong;

const Wrapper = styled.div`
  z-index: 3;
  width: 100vw;
  height: 87vh;
`;

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
