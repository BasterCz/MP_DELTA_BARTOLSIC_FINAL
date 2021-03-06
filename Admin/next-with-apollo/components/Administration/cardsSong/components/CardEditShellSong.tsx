import * as React from "react";
import { FormikProvider } from "formik";
import axios from "axios";
import styled from "styled-components";
//* CUSTOM
import { TagArray } from "./TagArray";
import { ImageUpload } from "./ImageUpload_Comp";
import { FileUpload } from "./FileUpload_Comp";
import { MyFormValues, useFormikUIHLS } from "../../../hooks/useFormikUISong";
import { usePlaylistMultiple } from "../../../hooks/usePlaylist";
//* MUI
import { palette } from "../../../../styles/palette";
import {
  Fab,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  ThemeProvider,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ReactNode, useEffect, useState } from "react";
import handleOnChangeUploadFormik from "../../../../extensions/api/formikOnChangeUploadSong";

type CardShellSongProps = {
  setCardVisible: () => void;
  iconSend: ReactNode;
  id?: string;
  initialValues?: MyFormValues;
  setValueIsSetAndLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDataLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDataLoaded?: boolean;
  isAddSong?: boolean;
};

export const CardShellSong: React.FC<CardShellSongProps> = ({
  setCardVisible,
  iconSend,
  id,
  initialValues,
  setValueIsSetAndLoaded,
  setDeleteDataLoaded,
  deleteDataLoaded,
  isAddSong,
}) => {
  const [setted, setSetted] = useState(false);
  const [uploaded, setUpload] = useState(false);
  const { playlists } = usePlaylistMultiple();
  const formikUI = useFormikUIHLS(
    axios,
    id !== undefined,
    initialValues,
    setValueIsSetAndLoaded,
    setDeleteDataLoaded,
    deleteDataLoaded
  );
  const { handleSubmit, handleChange, values } = formikUI;
  useEffect(() => {
    if (initialValues !== undefined && !setted) setSetted(true);
  });
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
            <FormGrid onSubmit={handleSubmit} id="addForm">
              <STextField
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                variant="outlined"
                color="primary"
              />
              <br />
              <ImageUpload
                uploaded={uploaded}
                setUpload={setUpload}
                uploadFileName="theFiles"
                onChange={(formData, destination, type, fileName) =>
                  handleOnChangeUploadFormik(
                    formData,
                    destination,
                    type,
                    fileName,
                    axios,
                    formikUI,
                    setUpload
                  )
                }
                destination="./public/img/"
                type="image"
                editFileName={values.imageName}
              />
              <FileUpload
                uploaded={uploaded}
                setUpload={setUpload}
                label="Audio file upload"
                uploadFileName="theFiles"
                onChange={(formData, destination, type, fileName) =>
                  handleOnChangeUploadFormik(
                    formData,
                    destination,
                    type,
                    fileName,
                    axios,
                    formikUI,
                    setUpload
                  )
                }
                editFileName={values.fileName}
                destination="./public/temp/"
                type="file"
              />
              <SFormControlLabel
                control={
                  <Checkbox defaultChecked={values.isPublic} onChange={(event, checked) => formikUI.setFieldValue('isPublic', checked)}  />
                }
                label="Public"
              />
              {setted || values.playlists === [] || isAddSong ? (
                <TagArray
                  playlists={playlists}
                  formikInstance={formikUI}
                  initialPlaylists={values.playlists}
                />
              ) : null}

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
            bottom: "10vh",
            right: "10vw",
          }}
        >
          {iconSend}
        </Fab>
        <Button
          sx={{
            position: "fixed",
            top: "3vh",
            left: "3vw",
          }}
          onClick={() => {
            setUpload(false);
            setCardVisible();
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      </Wrap>
    </ThemeProvider>
  );
};

export default CardShellSong;

const SCard = styled(Card)`
  height: 80vh;
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
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
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
