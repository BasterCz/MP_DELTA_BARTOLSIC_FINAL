import React from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HeadTitle from "./typography/headTitle";
import PlayerSmall from "./player/playerSite";

type MainContainerProps = {
  max: boolean;
  onClickMenu: () => void;
  handlerMinifyPlayer: () => void;
  handlerVisibilityPlayer: () => void; 
  playerMiniVisible: boolean;
  playerControlMini: boolean;
  title: string;
};

const heightOffset: number = 55;

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  max,
  title,
  playerMiniVisible,
  playerControlMini,
  onClickMenu,
  handlerMinifyPlayer,
  handlerVisibilityPlayer
}) => {
  return (
    <Wrapper
      style={{
        height: max ? "100vh" : "calc(100vh - " + heightOffset + "px)",
        top: max ? "-15px" : heightOffset + 15 + "px",
      }}
    >
      {max ? <Spacer /> : null}
      <MenuBtnSpacer>
        {max ? (
          <SIconButton onClick={onClickMenu}>
            <MenuRoundedIcon />
          </SIconButton>
        ) : (
          <SIconButton onClick={onClickMenu}>
            <CloseRoundedIcon />
          </SIconButton>
        )}
        <HeadTitle>
          {title}
        </HeadTitle>
        {playerMiniVisible?<PlayerSmall playerControlMini={playerControlMini} handlerMinifyPlayer={handlerMinifyPlayer} handlerVisibilityPlayer={handlerVisibilityPlayer}/>:null}
      </MenuBtnSpacer>
      {children}
    </Wrapper>
  );
};
export default MainContainer;

const Wrapper = styled.div`
  background-color: #1e222a;
  width: 100vw;
  min-height: 90vh;
  border-radius: 15px 15px 0px 0px;
  position: fixed;
  top: -15px;
  filter: drop-shadow(1px -4px 4px rgba(0, 0, 0, 0.2));
  overflow-y: scroll;
  overflow-x:hidden;
`;
const MenuBtnSpacer = styled.div`
  width: 100vw;
  height: 66px;
  display: flex;
  align-items: center;
`;
const SIconButton = styled(IconButton)`
  margin: 5px;
  color: #d8dee9;
  svg {
    font-size: 2.5rem;
  }
`;
const Spacer = styled.div`
  width: 100vw;
  height: 15px;
`;
