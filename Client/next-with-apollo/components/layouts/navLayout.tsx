import { useUser } from "@auth0/nextjs-auth0";
import { useContext, useEffect, useState } from "react";
import Context from "../../lib/context";
import { PlayerContext } from "../../lib/contextPlayer";
import DetailCardPlaylist from "../detailCard/detailCardPlaylist";
import DetailCardSong from "../detailCard/detailCardSong";
import DetailCardWrapper from "../detailCard/detailCardWrapper";
import { useCheckUserExists, useUserFunctions } from "../hooks/useUserActions";
import MainContainer from "../mainContainer";
import NavBottom from "../nav-bottom/navBottom";
import NavTop from "../nav-top/navTop";
import PlayerCard from "../player/playerCard";
import PlayerSmall from "../player/playerSite";
import ProgressShadowTop from "../player/progresShadowTop";

type SelectedType = "feed" | "search" | "library";
type DetailOfType = "song" | "playlist";

type LayoutProps = {
  maximized: boolean;
  title: string;
  selected: SelectedType;
  detailVisible: boolean;
  playerControlMini: boolean;
  playerMiniVisible: boolean;
  detailID: string;
  detailOf: DetailOfType;
  handlerMenuClick: () => void;
  handlerDetailClose: () => void;
  handlerMinifyPlayer: () => void;
  handlerChangeSelected: (input: SelectedType) => void;
  handlerVisibilityPlayer: () => void;
};

export const NavLayout: React.FC<LayoutProps> = ({
  handlerMenuClick,
  handlerDetailClose,
  handlerMinifyPlayer,
  handlerChangeSelected,
  handlerVisibilityPlayer,
  playerMiniVisible,
  playerControlMini,
  selected,
  maximized,
  title,
  detailVisible,
  detailID,
  detailOf,
  children,
}) => {
  const { playerVisible, setUserContext } = useContext(Context);
  const { audioCurrentTime, audioTime } = useContext(PlayerContext);
  const uContext = useUser();
  const { onAddUser } = useUserFunctions();
  const { userExists, userRefetch } = useCheckUserExists(uContext?.user?.sub?? "", true, false);
  const [userExistsHere, setUserExistsHere] = useState(userExists ?? false)
  
  useEffect(() => {
    setUserContext(uContext);
    userRefetch({ userID: uContext?.user?.sub?? "" });
    if(!userExistsHere && uContext?.user?.sub) {
      onAddUser(uContext?.user?.sub);
      setUserExistsHere(true);
    }
  }, [uContext.user?.sub, userExistsHere]);
  useEffect(() => {setUserExistsHere(userExists?? false)}, [userExists]);
  return (
    <>
      <ProgressShadowTop time={(audioCurrentTime/ audioTime)*100}/>

      <NavTop />
      {detailVisible ? (
        detailOf == "song" ? (
          <DetailCardSong
            handlerDetailClose={handlerDetailClose}
            detailVisible={detailVisible}
            _id={detailID}
          />
        ) : (
          <DetailCardPlaylist
            handlerDetailClose={handlerDetailClose}
            detailVisible={detailVisible}
            _id={detailID}
          />
        )
      ) : null}
      <MainContainer
        title={title}
        max={maximized}
        playerMiniVisible={playerMiniVisible}
        playerControlMini={playerControlMini}
        handlerVisibilityPlayer={handlerVisibilityPlayer}
        handlerMinifyPlayer={handlerMinifyPlayer}
        onClickMenu={handlerMenuClick}
      >
        {children}
      </MainContainer>
      {!playerVisible ? (
        <NavBottom
          selected={selected}
          handlerChangeSelected={handlerChangeSelected}
        />
      ) : null}
    </>
  );
};

export default NavLayout;
