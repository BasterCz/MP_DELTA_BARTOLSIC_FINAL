import * as React from "react";
import CardShellPlaylist from "./components/CardEditShellPlaylist";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import { MyFormValues } from "../../hooks/useFormikUIPlaylist";
import { usePlaylistOne } from "../../hooks/usePlaylist";

type CardEditPlaylistProps = {
  setEditPlaylistVisible: () => void;
  setDeleteDataLoaded: React.Dispatch<React.SetStateAction<boolean>>
  onPlayClick: (_src: string, _name: string) => void
  deleteDataLoaded: boolean;
  playlistID: string;
};

export const CardEditPlaylist: React.FC<CardEditPlaylistProps> = ({
  setEditPlaylistVisible,
  setDeleteDataLoaded,
  deleteDataLoaded,
  onPlayClick,
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
    setValueIsSetAndLoaded(true);
  }
  if (initialValues !== undefined)
    return (
      <CardShellPlaylist
        onPlayClick={onPlayClick}
        setCardVisible={setEditPlaylistVisible}
        iconSend={<EditRoundedIcon />}
        songs={songs}
        id={playlistID}
        initialValues={initialValues}
        setValueIsSetAndLoaded={setValueIsSetAndLoaded}
        setDeleteDataLoaded={setDeleteDataLoaded}
        deleteDataLoaded={deleteDataLoaded}
      />
    );
  else return null;
};



export default CardEditPlaylist;
