import { AxiosStatic } from "axios";
import utf8 from "utf8";
import { PlaylistsQuery } from "../__generated__/lib/viewer.graphql";

type createSongProps = {
  playlists?: PlaylistsQuery["playlists"];
  isPublic: boolean;
  name: string;
  fileName: string;
  imageName: string;
  axios: AxiosStatic;
};

type ResponseType = {
  data: string;
  _id: string;
};

export const createSong = async ({
  playlists,
  isPublic,
  name,
  fileName,
  imageName,
  axios,
}: createSongProps) => {
  //* HLS create ↓
  const outputFN =
    fileName
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .substr(0, fileName.lastIndexOf(".")) ||
    fileName
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const config = {
    responseEncoding: "utf-8",
    headers: {
      source:
        "./public/temp/" +
        fileName
          .replaceAll(" ", "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      destinationFolder: "./public/audio/" + outputFN,
      destinationImage:
        "/img/" +
        imageName
          .replaceAll(" ", "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      destinationFile: "/audio/" + outputFN + "/" + outputFN + ".m3u8",
      destination: "./public/audio/" + outputFN + "/" + outputFN + ".m3u8",
      name: utf8.encode(name) + "",
      isPublic: isPublic + "",
    },
  };

  const response = await axios.post("/api/hlsCreate", {}, config);
  const responseData = response.data as ResponseType;

  //* Add to playlists ↓

  playlists?.map(async (playlist) => {
    await axios.post(
      "/api/playlistAddSong",
      {},
      {
        headers: {
          id: playlist?._id as string,
          song: responseData._id as string,
        },
      }
    );
  });
};
