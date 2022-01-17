import { songsDelete } from "../extensions/api/mongoapi";

export const songDelete = async (
  _id: string
  ) => {
  return await songsDelete( _id );
}
export default songDelete

