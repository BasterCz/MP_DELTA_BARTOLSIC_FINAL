import { songsUpdate } from "../extensions/api/mongoapi";

export const songEditMongoDB = async (
  _id: string,
  name: string,
  audioPath: string,
  imagePath: string,
  isPublic: boolean
) => {
  
  return await songsUpdate(_id, name, audioPath, imagePath, isPublic);
};
export default songEditMongoDB;
