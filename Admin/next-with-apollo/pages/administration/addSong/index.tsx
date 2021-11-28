import type { NextPage } from "next";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
  FormikProvider,
} from "formik";
import { FormikAddSong } from "../../../components/formikAddSong";
import { UiFileInputButton } from "../../../components/uiFileInputButton";
import axios from "axios";
import React, { useState } from "react";
import hlsCreate from "../../../lib/hlsCreate";
import { TagArray } from "../../../components/tagArray";
import {
  Box,
  Button,
  Fab,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useFormikUIHLS } from "../../../components/hooks/useFormikUI";
import styled from "styled-components";
import { palette } from "../../../styles/palette";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { ImageInputBox } from "../../../components/imageInputBox";

const AdminAddSong: NextPage = () => {
  const [songTitle, setSongTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageName, setImageName] = useState("");
  const [publicBool, setPublicBool] = useState("");

  const onChange = async (
    formData: FormData,
    destination: string,
    type: "file" | "image",
    fileName: string
  ) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        destination: destination,
      },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/upload", formData, config);
    switch (type) {
      case "file":
        setFileName(fileName);
        break;
      case "image":
        setImageName(fileName);
        break;
    }

    console.log("response", response.data);
  };

  const formikUI = useFormikUIHLS(fileName, axios);

  return (
    <ThemeProvider theme={palette}>
      <Card
        sx={{
          bgcolor: "background.paper",
          height: '95vh',
          padding: 3,
          width: 9 / 10,
          color: "text.primary",
          margin: "2.5vh auto auto auto",
          overflow: "auto",
        }}
      >
        <FormikProvider value={formikUI}>
          <FormGrid onSubmit={formikUI.handleSubmit} id="addForm">
            <TextField
              id="name"
              name="name"
              label="Name"
              value={formikUI.values.name}
              onChange={formikUI.handleChange}
              variant="outlined"
              color="primary"
              sx={{
                gridColumnStart: 3,
                gridColumnEnd: 5,
                gridRowStart: 6,
                gridRowEnd: 7,
              }}
            />
            <br />
            <UiFileInputButton
              label="Audio file upload"
              uploadFileName="theFiles"
              onChange={onChange}
              destination="./public/temp/"
              type="file"
            />
            <ImageInputBox
              uploadFileName="theFiles"
              onChange={onChange}
              destination="./public/img/"
              type="image"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Public"
              sx={{
                gridColumnStart: 3,
                gridColumnEnd: 5,
                gridRowStart: 7,
                gridRowEnd: 8,
              }}
            />
            <TagArray />
            <Placeholder/>
            <br />
          </FormGrid>
        </FormikProvider>
      </Card>
      <Fab
        form="addForm"
        color="inherit"
        aria-label="save"
        type="submit"
        sx={{
          position: "fixed",
          bottom: "5vh",
          right: "10vw",
        }}
      >
        <FileUploadOutlinedIcon />
      </Fab>

    </ThemeProvider>
  );
};

export default AdminAddSong;

const FormGrid = styled.form`
  height: 100%;
  display: grid;
  grid-template-columns:
    calc((100% - 70vw) / 4) calc((100% - 70vw) / 4) 20vw 50vw calc(
      (100% - 70vw) / 4
    )
    calc((100% - 70vw) / 4);
  grid-template-rows:
    20px
    70vw
    30px
    60px
    30px
    60px
    60px
    60px
    90px
`;

const Placeholder = styled.div`
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 9;
  grid-row-end: 10;
`;
