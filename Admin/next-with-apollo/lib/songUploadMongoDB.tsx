import { songsAdd } from "../extensions/api/mongoapi";

export const songUploadMongoDB = async (name: string,
  audioPath: string,
  imagePath: string,
  isPublic: boolean
  ) => {
  return await songsAdd( name, audioPath, imagePath, isPublic );
}
export default songUploadMongoDB

