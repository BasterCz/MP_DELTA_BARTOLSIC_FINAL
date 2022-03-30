import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import SavedSearchRoundedIcon from "@mui/icons-material/SavedSearchRounded";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import React, { useContext, useState } from "react";
import styled from "styled-components";
import NewPlaylistDialog from "./newPlaylistDialog";
import { useUserFunctions } from "../hooks/useUserActions";
import Context from "../../lib/context";

type Props = {
  imagePath: string,
  songID:string,
}

export const OptionsDetailSong: React.FC<Props> = ({imagePath, songID}) => {
  const [open, setOpen] = useState(false);
  const {userContext} = useContext(Context);
  const {onAddPlaylistRef} = useUserFunctions();
  const handleClose = (output: string) => {
    setOpen(false);
    if(output !== "")onAddPlaylistRef(userContext?.user?.sub ?? "", output);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Wrapper>
      <SList>
        <ListItem button onClick={()=>handleOpen()}>
          <ListItemButton>
            <ListItemIcon>
              <QueueMusicRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Add to Playlist" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disabled>
            <ListItemIcon>
              <PlaylistPlayRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Saved in Playlists" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disabled>
            <ListItemIcon>
              <SavedSearchRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Find similar" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disabled>
            <ListItemIcon>
              <ShareRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Share" />
          </ListItemButton>
        </ListItem>
      </SList>
      <NewPlaylistDialog
        open={open}
        songID={songID}
        onClose={handleClose}
        imagePath={imagePath}
      />
    </Wrapper>
  );
};
export default OptionsDetailSong;

const Wrapper = styled.div`
  width: 100%;
  background-color: rgba(216, 222, 233, 0.03);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

const SList = styled(List)`
  width: 100%;
  color: #d8dee9;

  * {
    font-size: 1.2rem;
    font-family: "Varela Round", sans-serif;
  }
  svg {
    color: #d8dee9;
    font-size: 2.3rem;
  }
`;
