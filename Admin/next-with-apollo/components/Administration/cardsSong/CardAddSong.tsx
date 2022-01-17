import * as React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CardShellSong from "./components/CardEditShellSong";

type CardAddSongProps ={
  setCreateSongVisible: ()=>void
}

export const CardAddSong: React.FC<CardAddSongProps> = ({ setCreateSongVisible}) => {

  return (
    <CardShellSong isAddSong={true} setCardVisible={setCreateSongVisible} iconSend={<FileUploadOutlinedIcon/>} />
  );
};

export default CardAddSong;

