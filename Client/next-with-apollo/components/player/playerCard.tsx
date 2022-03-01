import { Button, Card, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useContext } from "react";
import styled from "styled-components";
import DetailTitle from "../typography/detailTitle";
import Image from "next/image";
import PlayerControls from "./playerControl";
import Waveform from "./waveform";
import { PlayerContext } from "../../lib/contextPlayer";

const imageSize = "300px";

type DetailCardWrapperProps = {
  handlerVisibilityPlayer: () => void; 
  playTitle: string;
  playImage: string;
};

export const PlayerCard: React.FC<DetailCardWrapperProps> = ({
  children,
  playTitle,
  playImage,
  handlerVisibilityPlayer
}) => {
  const {waveform} = useContext(PlayerContext);
  return (
    <Wrapper>
      <CardWrapper>
        <TopDiv>
          <CloseButton onClick={handlerVisibilityPlayer}>
            <CloseRoundedIcon />
          </CloseButton>
          <ImagePlace>
            {playImage !== "" ? (
              <SImage src={playImage} height={imageSize} width={imageSize} />
            ) : null}
          </ImagePlace>
          <DetailTitle>{playTitle}</DetailTitle>
        </TopDiv>
        <BottomDiv>
          <Waveform waveformData={waveform} />
          <PlayerControls></PlayerControls>
        </BottomDiv>
      </CardWrapper>
    </Wrapper>
  );
};
export default PlayerCard;

const Wrapper = styled.div`
  z-index: 1;
  width: 100vw;
  height: 100vh;
`;

const CardWrapper = styled(Card)`
  position: fixed;
  top: 0px;
  left:0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(20, 23, 28, 0.9);
  backdrop-filter: blur(7px);
  filter: drop-shadow(1px -4px 4px rgba(0, 0, 0, 0.1));
  z-index: 3;
`;

const CloseButton = styled(Button)`
  z-index: 3;
  align-self: flex-end;
  border-radius: 100%;
  svg {
    min-width: 38px;
    min-height: 38px;
    color: #d8dee9;
  }
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

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;