import * as React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CardShellSong from "./components/CardShellSong";

type CardAddSongProps ={
  setCreateSongVisible: ()=>void
}

export const CardAddSong: React.FC<CardAddSongProps> = ({ setCreateSongVisible}) => {

  return (
    <CardShellSong setCardVisible={setCreateSongVisible} iconSend={<FileUploadOutlinedIcon/>} />
  );
};

export default CardAddSong;

