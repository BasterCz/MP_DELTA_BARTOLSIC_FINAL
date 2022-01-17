import { playlistAddSong } from "../extensions/api/mongoapi";

export const songAddToPlaylist = async (
  _id: string,
  song: string
  ) => {
  return await playlistAddSong( _id, song,);
}
export default songAddToPlaylist

