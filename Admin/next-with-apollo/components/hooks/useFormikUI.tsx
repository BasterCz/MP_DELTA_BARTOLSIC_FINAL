import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import { createNewSong } from "../../extensions/createNewSong";
import { PlaylistsQuery } from "../../__generated__/lib/viewer.graphql";

export type MyFormValues = {
  playlists?: PlaylistsQuery["playlists"];
  isPublic: boolean;
  name: string;
  fileName: string;
  imageName: string;
}
const initialValues: MyFormValues = {
  playlists: [],
  isPublic: true,
  name: "",
  fileName: "",
  imageName: "",
};

type ResponseType = {
  data: string;
  _id: string;
};

export const useFormikUIHLS = (axios: AxiosStatic, iniValues : MyFormValues = initialValues) => {
  const formikUI = useFormik({
    initialValues: iniValues,
    onSubmit: async (
      { playlists, isPublic, name, fileName, imageName },
      actions
    ) => {
      createNewSong({
        playlists: playlists,
        isPublic: isPublic,
        name: name,
        fileName: fileName,
        imageName: imageName,
        axios: axios,
      });
    },
  });
  return formikUI;
};
