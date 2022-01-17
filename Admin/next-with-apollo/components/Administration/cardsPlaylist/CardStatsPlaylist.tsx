import * as React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { MyFormValues } from "../../hooks/useFormikDeletePlaylist";
import { usePlaylistOne } from "../../hooks/usePlaylist";
import CardShellStats from "./components/CardShellStatsPlaylist";

type CardDeletePlaylistProps = {
  setCardVisible: () => void;
  isVisible: boolean;
  playlistID: string;
};

export const CardStatsPlaylist: React.FC<CardDeletePlaylistProps> = ({
    setCardVisible,
    isVisible,
  playlistID,
}) => {
  const [initialValues, setInitialValues] = useState(
    undefined as MyFormValues | undefined
  );
  const [valueIsSetAndLoaded, setValueIsSetAndLoaded] = useState(false);

  const { playlist, songs } = usePlaylistOne(playlistID as string, true);


  if (playlist && songs && !valueIsSetAndLoaded) {
    setInitialValues({
      _id: playlistID,
      name: playlist.name,
      description: playlist.description,
      initialSongs: songs,
      songs: songs,
      isPublic: playlist.isPublic,
      imageName: playlist.image_path,
    });
    console.log(songs);
    setValueIsSetAndLoaded(true);
  }
  if (initialValues !== undefined)
    return (
      <CardShellStats
        setCardVisible={setCardVisible}
        isVisible={isVisible}
        iconSend={<DeleteRoundedIcon />}
        id={playlistID}
        initialValues={initialValues}
      />
    );
  else return null;
};



export default CardStatsPlaylist;
