import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import React from "react";
import { createPlaylist } from "../../extensions/createPlaylist";
import { updatePlaylist } from "../../extensions/updatePlaylist";
import { SongsQuery } from "../../__generated__/lib/viewer.graphql";

export type MyFormValues = {
  _id?: string;
  name: string;
  description: string;
  initialSongs?: SongsQuery["songs"];
  songs?: SongsQuery["songs"];
  imageName: string;
  isPublic: boolean;
};
const initialValues: MyFormValues = {
  _id: "",
  name: "",
  description: "",
  initialSongs: [],
  songs: [],
  imageName: "",
  isPublic: true,
};

type ResponseType = {
  data: string;
  _id: string;
};

export const useFormikUIHLS = (
  axios: AxiosStatic,
  toEdit: boolean,
  iniValues: MyFormValues = initialValues,
  setValueIsSetAndLoaded?: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteDataLoaded?: React.Dispatch<React.SetStateAction<boolean>>,
  deleteDataLoaded?: boolean
) => {
  const formikUI = useFormik({
    initialValues: iniValues,
    onSubmit: async (
      {
        _id = "",
        initialSongs,
        songs,
        description,
        isPublic,
        name,
        imageName,
      },
      actions
    ) => {
      toEdit
        ? updatePlaylist({
            _id: _id,
            name: name,
            description: description,
            initialSongs: initialSongs,
            songs: songs,
            isPublic: isPublic,
            imageName: imageName,
            axios: axios,
            setValueIsSetAndLoaded: setValueIsSetAndLoaded,
            setDeleteDataLoaded: setDeleteDataLoaded,
            deleteDataLoaded: deleteDataLoaded,
          })
        : createPlaylist({
            name: name,
            description: description,
            isPublic: isPublic,
            imageName: imageName,
            axios: axios,
          });
    },
  });
  return formikUI;
};
