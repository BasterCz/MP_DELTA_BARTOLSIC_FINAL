import type { NextPage } from "next";
import { Field, Form, Formik, useFormik } from "formik";
import { FormikAddSong } from "../../../components/formikAddSong";
import { UiFileInputButton } from "../../../components/uiFileInputButton";
import axios from "axios";
import React from "react";
import { Grid } from "@material-ui/core";

interface MyFormValues {
  firstName: string;
}

const AdminAddSong: NextPage = () => {
  const onChange = async (formData: FormData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/upload", formData, config);

    console.log("response", response.data);
  };
  const initialValues: MyFormValues = { firstName: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" />
        <br />
        <Grid item>
          <UiFileInputButton
            label="Upload Single File"
            uploadFileName="theFiles"
            onChange={onChange}
          />
        </Grid>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AdminAddSong;
