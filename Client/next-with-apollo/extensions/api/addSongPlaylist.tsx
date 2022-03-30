import { AxiosStatic } from "axios";
import utf8 from "utf8";
import axios from "axios";

type createPlaylistProps = {
  id: string;
  song: string;

};

type ResponseType = {
  data: string;
  _id: string;
};

export const addSongPlaylist = async ({
  id, song
}: createPlaylistProps) => {

  const config = {
    responseEncoding: "utf-8",
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
      id: id,
      song: song,
    },
  };

  return await axios.post("http://localhost:3000/api/playlistAddSong", {}, config).then(res => res);
};
