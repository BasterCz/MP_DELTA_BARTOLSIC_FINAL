import { Button, Card, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DetailTitle from "../typography/detailTitle";
import Image from "next/image";
import PlayerControls from "./playerControl";
import Waveform from "./waveform";
import { PlayerContext } from "../../lib/contextPlayer";
import SongQueueList from "./queueDragableList";
import Context from "../../lib/context";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import HeadTitleSmaller from "../typography/headTitleSmaller";

const imageSize = "300px";

type DetailCardWrapperProps = {
  handlerVisibilityPlayer: () => void;
};

export const PlayerCard: React.FC<DetailCardWrapperProps> = ({
  children,
  handlerVisibilityPlayer,
}) => {
  const { waveformQueue, songIndex, songQueue } = useContext(PlayerContext);
  const { queueVisible, setQueueVisible } = useContext(Context);
  useEffect(() => {}, [songIndex]);
  return (
    <Wrapper>
      <CardWrapper>
        {!queueVisible ? (
          <>
            <TopDiv>
              <CloseButton onClick={handlerVisibilityPlayer}>
                <CloseRoundedIcon />
              </CloseButton>
              <ImagePlace>
                {songQueue[songIndex].cover !== "" ? (
                  <SImage
                    src={songQueue[songIndex].cover}
                    height={imageSize}
                    width={imageSize}
                  />
                ) : null}
              </ImagePlace>
              <DetailTitle>{songQueue[songIndex].name}</DetailTitle>
            </TopDiv>
            <BottomDiv>
              <Waveform />
              <PlayerControls />
            </BottomDiv>
          </>
        ) : (
          <>
            <MenuBtnSpacer>
              <BackButton onClick={() => setQueueVisible(false)}>
                <ArrowBackIosNewRoundedIcon />
              </BackButton>
              <TitleWrapper><SHeadTitleSmaller>{"Queue"}</SHeadTitleSmaller></TitleWrapper>
            </MenuBtnSpacer>
            <SongQueueList />
          </>
        )}
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
  left: 0px;
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

const TitleWrapper = styled.div`
  transform: translateY(-3px);
`;

const SHeadTitleSmaller = styled(HeadTitleSmaller)`
  
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

const BackButton = styled(Button)`
  z-index: 3;
  align-self: flex-start;
  min-width: 50px;
  min-height: 50px;
  border-radius: 100%;
  margin: 5px;
  svg {
    color: #d8dee9;
    font-size: 1.8rem;
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
  margin-bottom: 27px;
`;

const MenuBtnSpacer = styled.div`
  width: 100vw;
  height: 66px;
  display: flex;
  align-items: center;
`;
