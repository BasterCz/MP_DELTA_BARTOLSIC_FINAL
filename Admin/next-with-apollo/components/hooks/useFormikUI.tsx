import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import React from "react";
import { createSong } from "../../extensions/createSong";
import { updateSong } from "../../extensions/updateSong";
import { PlaylistsQuery } from "../../__generated__/lib/viewer.graphql";

export type MyFormValues = {
  _id?: string;
  initialPlaylists?: PlaylistsQuery["playlists"];
  playlists?: PlaylistsQuery["playlists"];
  isPublic: boolean;
  name: string;
  fileName: string;
  imageName: string;
}
const initialValues: MyFormValues = {
  _id: "",
  initialPlaylists: [],
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

export const useFormikUIHLS = (axios: AxiosStatic, toEdit: boolean, iniValues : MyFormValues = initialValues, setValueIsSetAndLoaded?: React.Dispatch<React.SetStateAction<boolean>>) => {
  const formikUI = useFormik({
    initialValues: iniValues,
    onSubmit: async (
      {_id = "", initialPlaylists, playlists, isPublic, name, fileName, imageName },
      actions
    ) => {
      toEdit?
      updateSong({
        _id: _id,
        initialPlaylists: initialPlaylists,
        playlists: playlists,
        isPublic: isPublic,
        name: name,
        fileName: fileName,
        imageName: imageName,
        axios: axios,
        setValueIsSetAndLoaded: setValueIsSetAndLoaded
      })
      :
      createSong({
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
