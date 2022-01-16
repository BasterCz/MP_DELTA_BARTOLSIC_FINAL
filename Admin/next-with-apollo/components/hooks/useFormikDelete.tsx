import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import { deleteSong } from "../../extensions/deleteSong";
import { PlaylistsQuery } from "../../__generated__/lib/viewer.graphql";

export type MyFormValues = {
  _id: string;
  playlists: PlaylistsQuery["playlists"];
  name: string;
  fileName: string;
  imageName: string;
  
}

export const useFormikDelete = (axios: AxiosStatic, iniValues : MyFormValues, setCardVisible : ()=> void) => {
  const formikUI = useFormik({
    initialValues: iniValues,
    onSubmit: async (
      {_id, fileName },
      actions
    ) => {
      deleteSong({
        _id: _id,
        axios: axios,
        fileName: fileName,
        playlists: iniValues.playlists,
      })
      setCardVisible();
    },
  });
  return formikUI;
};
