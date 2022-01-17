import { playlistDelete } from "../extensions/api/mongoapi";

export const playlist = async (
  _id: string
  ) => {
  return await playlistDelete( _id );
}
export default playlistDelete

