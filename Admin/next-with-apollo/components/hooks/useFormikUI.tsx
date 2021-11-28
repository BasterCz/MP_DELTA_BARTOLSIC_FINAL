import { AxiosStatic } from "axios";
import { useFormik } from "formik";
import React from "react";

interface MyFormValues {
  playlists: { name: string }[];
  name: string;
}
const initialValues: MyFormValues = {
    playlists: [{ name: "test" }],
    name: "aa"
  };

export const useFormikUIHLS = (fileName:string, axios : AxiosStatic) => {
  const formikUI = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      let input = fileName;
      let output =
        input.replaceAll(" ", "_").substr(0, input.lastIndexOf(".")) ||
        input.replaceAll(" ", "_");
      let outputExt = output + ".m3u8";
      const config = {
        headers: {
          source: "./public/temp/" + fileName,
          destinationFolder: "./public/audio/" + output,
          destination: "./public/audio/" + output + "/" + outputExt,
        },
      };
      const response = await axios.post("/api/hlsCreate", {}, config);
    },
  });
  return formikUI
};
