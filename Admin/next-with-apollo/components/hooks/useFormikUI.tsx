import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import React from "react";
import { PlaylistsQuery } from "../../__generated__/lib/viewer.graphql";

export interface MyFormValues {
  playlists?: PlaylistsQuery["playlists"];
  isPublic: boolean;
  name: string;
  fileName: string;
  imageName: string;
}
const initialValues: MyFormValues = {
  playlists: [],
  isPublic: true,
  name: "aa",
  fileName: "",
  imageName: "",
};

type ResponseType = {
  data: string;
  _id: string;
};

export const useFormikUIHLS = (axios: AxiosStatic) => {
  const formikUI = useFormik({
    initialValues: initialValues,
    onSubmit: async (
      { playlists, isPublic, name, fileName, imageName },
      actions
    ) => {
      let inputFN = fileName;
      let outputFNwExt = inputFN.replaceAll(" ", "_");
      let outputFN =
        inputFN.replaceAll(" ", "_").substr(0, inputFN.lastIndexOf(".")) ||
        inputFN.replaceAll(" ", "_");
      let outputExtFN = outputFN + ".m3u8";
      let inputIN = imageName;
      let outputIN = inputIN.replaceAll(" ", "_");
      const config = {
        headers: {
          source: "./public/temp/" + outputFNwExt,
          destinationFolder: "./public/audio/" + outputFN,
          destinationImage: "/img/" + outputIN,
          destinationFile: "/audio/" + outputFN + "/" + outputExtFN,
          destination: "./public/audio/" + outputFN + "/" + outputExtFN,
          name: name + "",
          isPublic: isPublic + "",
        },
      };
      const response = await axios.post("/api/hlsCreate", {}, config);
      const responseData = response.data as ResponseType;
      playlists?.map(async (playlist) => {
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
      })
      console.log(response);
    },
    
  });
  return formikUI;
};
