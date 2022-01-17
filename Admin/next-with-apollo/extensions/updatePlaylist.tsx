import { AxiosStatic } from "axios";
import utf8 from "utf8";
import { PlaylistsQuery, SongsQuery } from "../__generated__/lib/viewer.graphql";

type updatePlaylistProps = {
  _id: string;
  name: string;
  description: string;
  imageName: string;
  isPublic: boolean;
  initialSongs?: SongsQuery["songs"]
  songs: SongsQuery["songs"]
  axios: AxiosStatic;
  setValueIsSetAndLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDataLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDataLoaded?: boolean;
};

type ResponseType = {
  data: string;
  _id: string;
};

export const updatePlaylist = async ({
  _id,
  name,
  description,
  imageName,
  isPublic,
  initialSongs,
  songs,
  axios,
  setValueIsSetAndLoaded,
  setDeleteDataLoaded,
  deleteDataLoaded,
}: updatePlaylistProps) => {

  const config = {
    headers: {
      _id: _id,
      name: utf8.encode(name) + "",
      description: utf8.encode(description),
      destinationImage:
        "/img/" +
        imageName
          .replaceAll(" ", "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      isPublic: isPublic + "",
      imageIsInitial:
        (imageName.startsWith("/img/") || imageName.startsWith("https://")) +
        "",
      possibleInitialImage: utf8.encode(imageName),
    },
  };

  const response = await axios.post("/api/playlistUpdate", {}, config);

  //* Add to playlists ↓
  const removedS = initialSongs?.filter(
    (x) => !songs?.some((y) => y?._id === x?._id)
  );
  const addedS = songs?.filter(
    (x) => !initialSongs?.some((y) => y?._id === x?._id)
  );

  removedS?.map(async (song) => {
    await axios.post(
      "/api/playlistRemoveSong",
      {},
      {
        headers: {
          id: _id as string,
          song: song?._id as string,
        },
      }
    );
  });

  addedS?.map(async (song) => {
    await axios.post(
      "/api/playlistAddSong",
      {},
      {
        headers: {
          id: _id as string,
          song: song?._id as string,
        },
      }
    );
  });

  if (setValueIsSetAndLoaded && setDeleteDataLoaded && deleteDataLoaded) {
    setValueIsSetAndLoaded(false);
    if (deleteDataLoaded) setDeleteDataLoaded(false);
  }
};
