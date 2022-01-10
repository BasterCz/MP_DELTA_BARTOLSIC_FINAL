import { AxiosStatic } from "axios";
import { PlaylistsQuery } from "../__generated__/lib/viewer.graphql";

type createNewSongProps = {
  playlists?: PlaylistsQuery["playlists"];
  isPublic: boolean;
  name: string;
  fileName: string;
  imageName: string;
  axios: AxiosStatic
}

type ResponseType = {
    data: string;
    _id: string;
  };

export const createNewSong = async ({playlists, isPublic, name, fileName, imageName, axios} : createNewSongProps) => {

//* HLS create ↓
    const outputFN =
    fileName.replaceAll(" ", "_").substr(0, fileName.lastIndexOf(".")) ||
    fileName.replaceAll(" ", "_");

    const config = {
    headers: {
        source: "./public/temp/" + fileName.replaceAll(" ", "_"),
        destinationFolder: "./public/audio/" + outputFN,
        destinationImage: "/img/" + imageName.replaceAll(" ", "_"),
        destinationFile: "/audio/" + outputFN + "/" + outputFN + ".m3u8",
        destination: "./public/audio/" + outputFN + "/" + outputFN + ".m3u8",
        name: name + "",
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
  })
}
