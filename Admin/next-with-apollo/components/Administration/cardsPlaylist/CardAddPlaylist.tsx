import * as React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CardShellPlaylist from "./components/CardEditShellPlaylist";

type CardAddPlaylistProps ={
  setCreatePlaylistVisible: ()=>void
}

export const CardAddPlaylist: React.FC<CardAddPlaylistProps> = ({ setCreatePlaylistVisible}) => {

  return (
    <CardShellPlaylist setCardVisible={setCreatePlaylistVisible} iconSend={<FileUploadOutlinedIcon/>} />
  );
};

export default CardAddPlaylist;

