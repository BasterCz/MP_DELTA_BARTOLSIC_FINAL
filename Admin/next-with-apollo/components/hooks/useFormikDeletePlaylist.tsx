import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import { deletePlaylist } from "../../extensions/deletePlaylist";
import { SongsQuery } from "../../__generated__/lib/viewer.graphql";

export type MyFormValues = {
  _id: string;
  songs: SongsQuery["songs"];
  initialSongs?: SongsQuery["songs"];
  name: string;
  description: string;
  isPublic: boolean;
  imageName: string;
  
}

export const useFormikDeletePlaylist = (axios: AxiosStatic, iniValues : MyFormValues, setCardVisible : ()=> void) => {
  const formikUI = useFormik({
    initialValues: iniValues,
    onSubmit: async (
      {_id },
      actions
    ) => {
      deletePlaylist({
        _id: _id,
        axios: axios,
        songs: iniValues.songs,
      })
      setCardVisible();
    },
  });
  return formikUI;
};
