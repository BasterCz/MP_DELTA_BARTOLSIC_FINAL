import * as React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { MyFormValues } from "../../hooks/useFormikDeleteSong";
import { useSongOne, useSongPlaylists } from "../../hooks/useSongs";
import CardShellStats from "./components/CardShellStatsSong";

type CardDeleteSongProps = {
  setCardVisible: () => void;
  isVisible: boolean;
  songID: string;
};

export const CardStatsSong: React.FC<CardDeleteSongProps> = ({
    setCardVisible,
    isVisible,
  songID,
}) => {
  const [initialValues, setInitialValues] = useState(
    undefined as MyFormValues | undefined
  );
  const [valueIsSetAndLoaded, setValueIsSetAndLoaded] = useState(false);

  const { song } = useSongOne(songID as string, true, true);
  const { playlists: playlists_Song } = useSongPlaylists(
    songID as string,
    true,
    true
  );

  if (song && playlists_Song && !valueIsSetAndLoaded) {
    setInitialValues({
      _id: songID,
      playlists: playlists_Song,
      name: song.name,
      fileName: song.file_path,
      imageName: song.image_path,
    });
    setValueIsSetAndLoaded(true);
  }
  if (initialValues !== undefined)
    return (
      <CardShellStats
        setCardVisible={setCardVisible}
        isVisible={isVisible}
        iconSend={<DeleteRoundedIcon />}
        id={songID}
        initialValues={initialValues}
      />
    );
  else return null;
};



export default CardStatsSong;
