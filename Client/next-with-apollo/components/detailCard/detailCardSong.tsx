import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DetailCardWrapper from "./detailCardWrapper";
import { useSongOne } from "../hooks/useSongs";
import DetailTitle from "../typography/detailTitle";
import ControlsDetailSong from "./controlsSong";
import OptionsDetailSong from "./optionListSong";

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
  const { song, refetchSong } = useSongOne(_id, isReady, false);
  const [srcPath, setSrcPath] = useState<string>("");

  useEffect(() => {
    setIsReady(detailVisible);
  }, [detailVisible]);

  useEffect(() => {
    refetchSong({ _id });
  }, [_id]);

  useEffect(() => {
    if (song?.image_path! !== undefined)
      setSrcPath("http://localhost:3000" + song?.image_path!);
  }, [song]);

  return (
    <Wrapper>
      <DetailCardWrapper handlerDetailClose={handlerDetailClose}>
        <ImagePlace>
          {srcPath !== "" ? (
            <SImage src={srcPath} height={imageSize} width={imageSize} />
          ) : null}
        </ImagePlace>
        <ControlsDetailSong />
        <DetailTitle>{song?.name}</DetailTitle>
        <OptionsDetailSong />
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
