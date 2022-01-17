import { AxiosStatic } from "axios";
import utf8 from "utf8";
import { PlaylistsQuery, SongsQuery } from "../__generated__/lib/viewer.graphql";

type createPlaylistProps = {
  name: string;
  description: string;
  imageName: string;
  isPublic: boolean;
  axios: AxiosStatic;
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
  axios,
}: createPlaylistProps) => {
  //* HLS create ↓

  const config = {
    responseEncoding: "utf-8",
    headers: {
      name: utf8.encode(name)  + "",
      description: utf8.encode(description) + "",
      destinationImage:
        "/img/" +
        imageName
          .replaceAll(" ", "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      isPublic: isPublic + ""
    },
  };

  const response = await axios.post("/api/playlistCreate", {}, config);

  return response.data;
};
