import * as React from "react";
import { SingleFileUploadWithProgress } from "../lib/fileUpload";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useFormik,
} from "formik";
import { useCallback, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { Grid, TextField } from "@material-ui/core";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const FormikAddSong: React.FC = () => {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image/*", "video/*", ".pdf"],
    maxSize: 300 * 1024, // 300KB
  });

  interface MyFormValues {
    title: string;
  }

  const initialValues: MyFormValues = { title: "aaa" };

  const formikUI = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      console.log({ values, actions });
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    },
  });

  return (
    <div>
      <h1>My Example</h1>
      <Form onSubmit={formikUI.handleSubmit}>
        <TextField
         id="name" 
         name="name" 
         label="Name"
         value={formikUI.values.title}
         onChange={formikUI.handleChange}
         variant="outlined"
         />
        <br />
        <Grid item>
          <div {...getRootProps({ className: "classes.dropzone" })}>
            <input {...getInputProps()} />

            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </Grid>
        {files.map((file) => (
          <SingleFileUploadWithProgress
            file={file.file}
            onDelete={function (file: File): void {
              throw new Error("Function not implemented.");
            }}
            onUpload={function (file: File, url: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}
