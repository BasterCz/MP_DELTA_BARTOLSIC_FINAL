import { useSongsAddMutation } from "../__generated__/lib/viewer.graphql";


export default function songUploadMongoDB(
  name: string,
  audioPath: string,
  imagePath: string,
  isPublic: string
) {
  console.log("here");
  const [addSong] = useSongsAddMutation();
  console.log("here");
  console.log(addSong);
  addSong({ variables: { name: name, file_path: audioPath, image_path: imagePath, isPublic: (isPublic==="true") } })
}

