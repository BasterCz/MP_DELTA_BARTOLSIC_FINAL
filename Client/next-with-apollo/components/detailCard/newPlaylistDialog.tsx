import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import {
  PlaylistQuery,
  PlaylistsQuery,
} from "../../__generated__/lib/viewer.graphql";
import Image from "next/image";
import { useContext, useState } from "react";
import Context from "../../lib/context";
import { useGetPlaylistRef } from "../hooks/useLibrary";
import { createPlaylist } from "../../extensions/api/createPlaylist";
import { addSongPlaylist } from "../../extensions/api/addSongPlaylist";
import { useUserFunctions } from "../hooks/useUserActions";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  imagePath: string;
  songID: string;
}

export const NewPlaylistDialog: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
  imagePath,
  songID,
}) => {
  const [newPTitle, setNewPTitle] = useState("");
  const { onAddPlaylistRef } = useUserFunctions();
  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  const { userContext } = useContext(Context);
  const { playlistRefs: playlists } = useGetPlaylistRef(
    userContext?.user?.sub ?? "",
    true,
    true
  );
  const handleNewPlaylist = async (
    name: string,
    description: string,
    isPublic: boolean,
    imageName: string
  ) => {
    return await createPlaylist({
      name,
      description,
      isPublic,
      imageName,
    });
  };
  const handleAddSongToPlaylist = async (id: string, song: string) => {
    return await addSongPlaylist({ id, song });
  };

  return (
    <Dialog open={open} onClose={()=>onClose("")}>
      <DialogTitle>Add song to playlist</DialogTitle>
      <ListItem autoFocus>
        <ListItemAvatar
          onClick={async () => {
            const resID = (
              (await (
                await handleNewPlaylist(newPTitle, "", false, imagePath)
              ).data) as any
            )._id;
            await handleAddSongToPlaylist(resID, songID);
            await onAddPlaylistRef(userContext?.user?.sub ?? "", resID);
          }}
        >
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setNewPTitle(e.target.value)}
        />
      </ListItem>
      <List sx={{ pt: 0 }}>
        {playlists?.map((playlist) => (
          <ListItem
            button
            onClick={() => handleListItemClick(playlist?._id ?? "")}
            key={playlist?._id}
          >
            <ListItemAvatar>
              <Avatar>
                {playlist?.image_path ? (
                  <Image
                    src={"http://localhost:3000" + playlist?.image_path!}
                    height={"50px"}
                    width={"50px"}
                  />
                ) : null}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={playlist?.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default NewPlaylistDialog;
