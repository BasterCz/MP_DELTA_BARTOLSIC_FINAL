import * as React from "react";
import CardShellSong from "./components/CardShellSong";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import { MyFormValues } from "../../hooks/useFormikUI";
import { useSongOne, useSongPlaylists } from "../../hooks/useSongs";

type CardEditSongProps = {
  setEditSongVisible: () => void;
  songID: string;
};

export const CardEditSong: React.FC<CardEditSongProps> = ({
  setEditSongVisible,
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
      initialPlaylists: playlists_Song,
      playlists: playlists_Song,
      isPublic: song.isPublic,
      name: song.name,
      fileName: song.file_path,
      imageName: song.image_path,
    });
    setValueIsSetAndLoaded(true);
  }
  if (initialValues !== undefined)
    return (
      <CardShellSong
        setCardVisible={setEditSongVisible}
        iconSend={<EditRoundedIcon />}
        id={songID}
        initialValues={initialValues}
        setValueIsSetAndLoaded={setValueIsSetAndLoaded}
      />
    );
  else return null;
};



export default CardEditSong;
