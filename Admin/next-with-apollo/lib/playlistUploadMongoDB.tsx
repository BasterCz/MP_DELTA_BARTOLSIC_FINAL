import { playlistAdd } from "../extensions/api/mongoapi";

export const playlistUploadMongoDB = async (
  name: string,
  description: string,
  imagePath: string,
  isPublic: boolean
  ) => {
  return await playlistAdd( name, description, imagePath, isPublic );
}
export default playlistUploadMongoDB

