import { playlistUpdate } from "../extensions/api/mongoapi";

export const PlaylistEditMongoDB = async (
  _id: string,
  name: string,
  description: string,
  imagePath: string,
  isPublic: boolean
) => {
  
  return await playlistUpdate(_id, name, description, imagePath, isPublic);
};
export default PlaylistEditMongoDB;
