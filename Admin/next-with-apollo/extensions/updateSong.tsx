import { AxiosStatic } from "axios";
import utf8 from "utf8";
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
  setDeleteDataLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDataLoaded?: boolean;
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
  setValueIsSetAndLoaded,
  setDeleteDataLoaded,
  deleteDataLoaded,
}: updateSongProps) => {
  //* HLS create ↓
  const outputFN =
    fileName.replaceAll(" ", "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "").substr(0, fileName.lastIndexOf(".")) ||
    fileName.replaceAll(" ", "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const config = {
    headers: {
      _id: _id,
      source: "./public/temp/" + fileName.replaceAll(" ", "_").normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      destinationFolder: "./public/audio/" + outputFN,
      destinationImage: "/img/" + imageName.replaceAll(" ", "_").normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      destinationFile: "/audio/" + outputFN + "/" + outputFN + ".m3u8",
      destination: "./public/audio/" + outputFN + "/" + outputFN + ".m3u8",
      name: utf8.encode(name) + "",
      isPublic: isPublic + "",
      imageIsInitial:
        (imageName.startsWith("/img/") || imageName.startsWith("https://")) +
        "",
      possibleInitialImage: imageName,
      fileIsInitial:
        (fileName.startsWith("/audio/") || imageName.startsWith("https://")) +
        "",
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
  if (setValueIsSetAndLoaded && setDeleteDataLoaded && deleteDataLoaded) {
    setValueIsSetAndLoaded(false);
    if (deleteDataLoaded) setDeleteDataLoaded(false);
  }
};
