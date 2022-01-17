import { playlistRemoveSong } from "../extensions/api/mongoapi";

export const songRemoveFromPlaylist = async (
  _id: string,
  song: string
  ) => {
  return await playlistRemoveSong( _id, song,);
}
export default songRemoveFromPlaylist

