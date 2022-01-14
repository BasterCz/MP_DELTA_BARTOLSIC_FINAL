import * as React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { MyFormValues } from "../../hooks/useFormikDelete";
import { useSongOne, useSongPlaylists } from "../../hooks/useSongs";
import CardDeleteShell from "./components/CardDeleteShell";

type CardDeleteSongProps = {
  setDeleteSongVisible: () => void;
  songID: string;
};

export const CardDeleteSong: React.FC<CardDeleteSongProps> = ({
  setDeleteSongVisible,
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
    console.log(playlists_Song);
    setValueIsSetAndLoaded(true);
  }
  if (initialValues !== undefined)
    return (
      <CardDeleteShell
        setCardVisible={setDeleteSongVisible}
        iconSend={<DeleteRoundedIcon />}
        id={songID}
        initialValues={initialValues}
      />
    );
  else return null;
};



export default CardDeleteSong;
