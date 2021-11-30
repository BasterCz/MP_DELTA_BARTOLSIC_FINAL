import * as React from "react";
import { useState } from "react";
import {
  FormikProvider,
} from "formik";
import { UiFileInputButton } from "./uiFileInputButton";
import axios from "axios";
import hlsCreate from "../lib/hlsCreate";
import { TagArray } from "./tagArray";
import {
  Fab,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useFormikUIHLS } from "./hooks/useFormikUI";
import styled from "styled-components";
import { palette } from "../styles/palette";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { ImageInputBox } from "./imageInputBox";

export const CardAddSong: React.FC = () => {
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

  const formikUI = useFormikUIHLS(fileName, imageName, axios);

  return (
    <ThemeProvider theme={palette}>
      <Wrap>
        <SCard
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
          }}
        >
          <FormikProvider value={formikUI}>
            <FormGrid onSubmit={formikUI.handleSubmit} id="addForm">
              <STextField
                id="name"
                name="name"
                label="Name"
                value={formikUI.values.name}
                onChange={formikUI.handleChange}
                variant="outlined"
                color="primary"
              />
              <br />
              <UiFileInputButton
                label="Audio file upload"
                uploadFileName="theFiles"
                onChange={()=>{onChange; formikUI.handleChange}}
                destination="./public/temp/"
                type="file"
              />
              <ImageInputBox
                uploadFileName="theFiles"
                onChange={()=>{onChange; formikUI.handleChange}}
                destination="./public/img/"
                type="image"
              />
              <SFormControlLabel
                control={<Checkbox defaultChecked />}
                label="Public"
              />
              <TagArray />
              <Placeholder />
              <br />
            </FormGrid>
          </FormikProvider>
        </SCard>
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
      </Wrap>
    </ThemeProvider>
  );
};
export default CardAddSong;
const SCard = styled(Card)`
  height: 95vh;
  width: 90%;
  max-width: 810px;
  padding: 3;
  margin: 2.5vh auto auto auto;
  overflow: auto;
  @media only screen and (min-width: 481px) {
    height: auto;
  } ;
`;

const Wrap = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: grid;
  align-content: center;
  height: 100vh;
  margin: 0;
`;

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
    90px;
  @media only screen and (min-width: 376px) {
    grid-template-columns:
      calc((100% - 70vw) / 4) calc((100% - 70vw) / 4) 5vw 15vw 45vw 5vw calc(
        (100% - 70vw) / 4
      )
      calc((100% - 70vw) / 4);
    grid-template-rows:
      20px
      60vw
      30px
      60px
      30px
      60px
      60px
      60px
      90px;
  }
  @media only screen and (min-width: 425px) {
    grid-template-columns:
      calc((100% - 70vw) / 4) calc((100% - 70vw) / 4) 7vw 13vw 43vw 7vw calc(
        (100% - 70vw) / 4
      )
      calc((100% - 70vw) / 4);
    grid-template-rows:
      20px
      56vw
      30px
      60px
      30px
      60px
      60px
      60px
      90px;
  }
  @media only screen and (min-width: 481px) {
    margin: auto;
    grid-template-columns:
      calc((100% - 80vw) / 2)
      40vw
      15px
      calc(40vw - 15px)
      calc((100% - 80vw) / 2);
    grid-template-rows:
      5vw
      60px
      60px
      60px
      60px
      60px
      30px
      60px
      37px;
  }
  @media only screen and (min-width: 751px) {
    grid-template-columns:
      calc((100% - 80vw) / 2)
      300px
      15px
      calc(80vw - 315px)
      calc((100% - 80vw) / 2);
    grid-template-rows:
      37px
      60px
      60px
      60px
      60px
      60px
      30px
      60px
      37px;
  }
  @media only screen and (min-width: 900px) {
    grid-template-columns:
      calc((100% - 720px) / 2)
      300px
      15px
      calc(720px - 315px)
      calc((100% - 720px) / 2);
  } ;
`;

const Placeholder = styled.div`
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 9;
  grid-row-end: 10;
  @media only screen and (min-width: 376px) {
    grid-column-start: 1;
    grid-column-end: 9;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 1;
    grid-column-end: 6;
  } ;
`;

const STextField = styled(TextField)`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 6;
  grid-row-end: 7;
  @media only screen and (min-width: 376px) {
    grid-column-start: 3;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
  } ;
`;
const SFormControlLabel = styled(FormControlLabel)`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 7;
  grid-row-end: 8;
  @media only screen and (min-width: 376px) {
    grid-column-start: 3;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 4;
  } ;
`;
