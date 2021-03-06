import * as React from "react";
import { FormikProvider } from "formik";
import axios from "axios";
 import styled from "styled-components";
//* CUSTOM
import { MyFormValues, useFormikDeletePlaylist } from "../../../hooks/useFormikDeletePlaylist";
//* MUI
import { palette } from "../../../../styles/palette";
import {
  Fab,
  Card,
  ThemeProvider,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ReactNode, useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

type CardShellPlaylistProps = {
  setCardVisible: () => void;
  iconSend: ReactNode;
  id?: string;
  initialValues: MyFormValues;
};

export const CardShellPlaylist: React.FC<CardShellPlaylistProps> = ({
  setCardVisible,
  iconSend,
  id,
  initialValues,
}) => {
  const [setted, setSetted] = useState(false);
  const formikUI = useFormikDeletePlaylist(axios, initialValues, setCardVisible);
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
              <STypographyImportant>
                Do you really want to delete the playlist <b>{values.name}</b>?
              </STypographyImportant>
              <STypography>
                It will be removed form the following songs aswell:
              </STypography>
              <SList>
                {values.songs?.map((song) => 
                    <SListItem key={song?._id}>
                      <PlaylistItem
                        id={song?._id ?? ""}
                        image_path={song?.image_path ?? ""}
                        name={song?.name ?? ""}
                      />
                    </SListItem>
                )}
              </SList>
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
            bottom: "11.5vh",
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
          onClick={setCardVisible}
        >
          <CloseRoundedIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      </Wrap>
    </ThemeProvider>
  );
};

export default CardShellPlaylist;

const SCard = styled(Card)`
  height: 70vh;
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

const STypographyImportant = styled(Typography)`
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  text-align: center;
  font-size: 1.5rem;
  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
  } ;
`;
const STypography = styled(Typography)`
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 4;
  font-size: 1.1rem;
  height: 50px;
  line-height: 50px;
  text-align: center;
  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 4;
  } ;
`;
const SList = styled(List)`
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 7;
  grid-row-end: 8;
  @media only screen and (min-width: 376px) {
    grid-column-start: 3;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 4;
    grid-row-end: 9;
  } ;
`;
const SListItem = styled(ListItem)`
  padding: 1px 0px 7px 0px;
`;

