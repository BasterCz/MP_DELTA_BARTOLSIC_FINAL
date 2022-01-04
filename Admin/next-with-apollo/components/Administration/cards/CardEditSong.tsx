import * as React from "react";
import CardShellSong from "./components/CardShellSong";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

type CardEditSongProps ={
  setEditSongVisible: ()=>void;
  songID: string
}

export const CardEditSong: React.FC<CardEditSongProps> = ({ setEditSongVisible, songID}) => {

  return (
    <CardShellSong setCardVisible={setEditSongVisible} iconSend={<EditRoundedIcon/>} id={songID} />
  );
};

export default CardEditSong;
