import { AxiosStatic } from "axios";
import { PlaylistsQuery } from "../__generated__/lib/viewer.graphql";

type updateSongProps = {
  _id: string;
  axios: AxiosStatic;
  fileName: string;
  playlists: PlaylistsQuery["playlists"]; 
};

export const deleteSong = async ({
  _id,
  axios,
  fileName,
  playlists
}: updateSongProps) => {

  playlists?.map(async (playlist) => {
    await axios.post(
      "/api/playlistRemoveSong",
      {},
      {
        headers: {
          id: playlist?._id as string,
          song: _id as string,
        },
      }
    );
  });

    await axios.post(
      "/api/hlsDelete",
      {},
      {
        headers: {
          id: _id as string,
          pathToFile: fileName.replace('\/(?:.(?!\/))+$', "")
        },
      }
    );
};
