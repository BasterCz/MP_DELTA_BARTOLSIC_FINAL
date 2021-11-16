import type { NextPage } from "next";
import { Field, Form, Formik, useFormik } from "formik";
import { FormikAddSong } from "../../../components/formikAddSong";
import { UiFileInputButton } from "../../../components/uiFileInputButton";
import axios from "axios";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import hlsCreate from "../../../lib/hlsCreate";

interface MyFormValues {
  firstName: string;
}

const AdminAddSong: NextPage = () => {
  const [fileName, setFileName] = useState("")
  const [imageName, setImageName] = useState("")
  const onChange = async (formData: FormData, destination: string, type: 'file' | 'image', fileName: string) => {
  
    const config = {
      headers: { "content-type": "multipart/form-data", "destination": destination},
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/upload", formData, config);
    switch (type) {
      case 'file': setFileName(fileName); break;
      case 'image': setImageName(fileName); break;
    }

    console.log("response", response.data);
  };
  const initialValues: MyFormValues = { firstName: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        let input = fileName
        let output = input.replaceAll(' ', '_').substr(0, input.lastIndexOf('.')) || input.replaceAll(' ', '_');
        let outputExt = output + ".m3u8" 
        const config = {
          headers: { "source": "./public/temp/"+fileName,  "destinationFolder": "./public/audio/"+ output  , "destination": "./public/audio/"+ output + "/" + outputExt },
        };
        const response = await axios.post("/api/hlsCreate", {}, config);
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" />
        <br />
        <Grid item>
          <UiFileInputButton
            label="Audio file upload"
            uploadFileName="theFiles"
            onChange={onChange}
            destination="./public/temp/"
            type='file'
          />
        </Grid>
        <Grid item>
          <UiFileInputButton
            label="Image file upload"
            uploadFileName="theFiles"
            onChange={onChange}
            destination="./public/img/"
            type='image'
          />
        </Grid>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AdminAddSong;
