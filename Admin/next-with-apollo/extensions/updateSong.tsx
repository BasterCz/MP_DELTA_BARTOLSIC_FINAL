import { AxiosStatic } from "axios";
import { PlaylistsQuery } from "../__generated__/lib/viewer.graphql";

type updateSongProps = {
  _id: string;
  initialPlaylists?: PlaylistsQuery["playlists"];
  playlists?: PlaylistsQuery["playlists"];
  isPublic: boolean;
  name: string;
  fileName: string;
  imageName: string;
  axios: AxiosStatic;
  setValueIsSetAndLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
};

type ResponseType = {
  data: string;
  _id: string;
};

export const updateSong = async ({
  _id,
  initialPlaylists,
  playlists,
  isPublic,
  name,
  fileName,
  imageName,
  axios,
  setValueIsSetAndLoaded
}: updateSongProps) => {
  //* HLS create ↓
  const outputFN =
    fileName.replaceAll(" ", "_").substr(0, fileName.lastIndexOf(".")) ||
    fileName.replaceAll(" ", "_");

  const config = {
    headers: {
      _id: _id,
      source: "./public/temp/" + fileName.replaceAll(" ", "_"),
      destinationFolder: "./public/audio/" + outputFN,
      destinationImage: "/img/" + imageName.replaceAll(" ", "_"),
      destinationFile: "/audio/" + outputFN + "/" + outputFN + ".m3u8",
      destination: "./public/audio/" + outputFN + "/" + outputFN + ".m3u8",
      name: name + "",
      isPublic: isPublic + "",
      imageIsInitial: imageName.startsWith("/img/") + "",
      possibleInitialImage: imageName,
      fileIsInitial: fileName.startsWith("/audio/") + "",
      possibleInitialFile: fileName,
    },
  };
  const response = await axios.post("/api/hlsUpdate", {}, config);
  const responseData = response.data as ResponseType;
  console.log(response.data);
  //* Add to playlists ↓
  const removedP = initialPlaylists?.filter(
    (x) => !playlists?.some((y) => y?._id === x?._id)
  );
  const addedP = playlists?.filter(
    (x) => !initialPlaylists?.some((y) => y?._id === x?._id)
  );

  removedP?.map(async (playlist) => {
    await axios.post(
      "/api/playlistRemoveSong",
      {},
      {
        headers: {
          id: playlist?._id as string,
          song: responseData._id as string,
        },
      }
    );
  });

  addedP?.map(async (playlist) => {
    await axios.post(
      "/api/playlistAddSong",
      {},
      {
        headers: {
          id: playlist?._id as string,
          song: responseData._id as string,
        },
      }
    );
  });
  if(setValueIsSetAndLoaded)
  setValueIsSetAndLoaded(false)
};
