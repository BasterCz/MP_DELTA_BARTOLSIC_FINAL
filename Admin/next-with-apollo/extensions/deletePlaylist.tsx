import { AxiosStatic } from "axios";
import { SongsQuery } from "../__generated__/lib/viewer.graphql";

type updateSongProps = {
  _id: string;
  axios: AxiosStatic;
  songs: SongsQuery["songs"];
};

export const deletePlaylist = async ({
  _id,
  axios,
  songs
}: updateSongProps) => {

  songs?.map(async (song) => {
    await axios.post(
      "/api/playlistRemoveSong",
      {},
      {
        headers: {
          id: _id as string,
          song: song?._id as string,
        },
      }
    );
  });
};
