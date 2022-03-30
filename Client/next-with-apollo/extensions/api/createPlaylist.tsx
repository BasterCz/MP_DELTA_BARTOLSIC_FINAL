import { AxiosStatic } from "axios";
import utf8 from "utf8";
import axios from "axios";

type createPlaylistProps = {
  name: string;
  description: string;
  imageName: string;
  isPublic: boolean;
};

type ResponseType = {
  data: string;
  _id: string;
};

export const createPlaylist = async ({
  name,
  description,
  imageName,
  isPublic,
}: createPlaylistProps) => {

  const config = {
    responseEncoding: "utf-8",
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
      name: utf8.encode(name)  + "",
      description: utf8.encode(description) + "",
      destinationImage:imageName.replace("http://164.92.167.169:3000", ""),
      isPublic: isPublic + "" 
    },
  };

  return await axios.post("http://164.92.167.169:3000/api/playlistCreate", {}, config).then(res => res);
};
