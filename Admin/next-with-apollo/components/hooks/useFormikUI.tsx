import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import React from "react";

interface MyFormValues {
  playlists: { name: string }[];
  isPublic: boolean;
  name: string;
}
const initialValues: MyFormValues = {
  playlists: [{ name: "test" }],
  isPublic: true,
  name: "aa",
};

export const useFormikUIHLS = (
  fileName: string,
  imageName: string,
  axios: AxiosStatic
) => {
  const formikUI = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      let inputFN = fileName;
      let outputFN =
      inputFN.replaceAll(" ", "_").substr(0, inputFN.lastIndexOf(".")) ||
      inputFN.replaceAll(" ", "_");
      let outputExtFN = outputFN + ".m3u8";
      let inputIN = fileName;
      let outputIN =
      inputIN.replaceAll(" ", "_");
      
      const config = {
        headers: {
          source: "./public/temp/" + fileName,
          destinationFolder: "./public/audio/" + outputFN,
          destinationImage: "/img/"+outputIN,
          destinationFile: "/audio/" + outputFN + "/" + outputExtFN,
          destination: "./public/audio/" + outputFN + "/" + outputExtFN,
          name: values.name + "",
          isPublic: values.isPublic + "",
        },
      };
      const response = await axios.post("/api/hlsCreate", {}, config);
    },
  });
  return formikUI;
};
