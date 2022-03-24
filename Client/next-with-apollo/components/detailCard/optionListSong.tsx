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
import SavedSearchRoundedIcon from '@mui/icons-material/SavedSearchRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

import React from "react";
import styled from "styled-components";

export const OptionsDetailSong: React.FC = () => {
  return (
    <Wrapper>
      <SList>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <QueueMusicRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Add to Playlist" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <PlaylistPlayRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Saved in Playlists" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SavedSearchRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Find similar" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ShareRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Share" />
          </ListItemButton>
        </ListItem>
      </SList>
    </Wrapper>
  );
};
export default OptionsDetailSong;

const Wrapper = styled.div`
  width: 100%;
  background-color: rgba(216, 222, 233,0.03);
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
  font-family: 'Varela Round', sans-serif;
  
  }
  svg {
    color: #d8dee9;
    font-size: 2.3rem;
  }
  
`;
