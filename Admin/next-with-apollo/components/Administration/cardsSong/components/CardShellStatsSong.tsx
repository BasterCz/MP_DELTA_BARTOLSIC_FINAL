import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import LineGraph from "./LineGraph";
//* CUSTOM
import { MyFormValues, useFormikDeleteSong } from "../../../hooks/useFormikDeleteSong";
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
  Typography,
  List,
  ListItem,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ReactNode, useEffect, useState } from "react";
import { useViews, useViewsDate } from "../../../hooks/useViews";
import { useSongOne } from "../../../hooks/useSongs";
import Image from "next/image";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

type CardShellSongProps = {
  setCardVisible: () => void;
  isVisible: boolean;
  iconSend: ReactNode;
  id: string;
  initialValues: MyFormValues;
};

export const CardShellStats: React.FC<CardShellSongProps> = ({
  setCardVisible,
  isVisible,
  iconSend,
  id,
  initialValues,
}) => {
  const [setted, setSetted] = useState(false);
  const formikUI = useFormikDeleteSong(axios, initialValues, setCardVisible);
  const { data, refetch } = useViewsDate(id, 1000);
  const { views } = useViews(id);
  const { song } = useSongOne(id, true, true);
  const { handleSubmit, handleChange, values } = formikUI;
  useEffect(() => {
    if (initialValues !== undefined && !setted) setSetted(true);
  });
  useEffect(() => {
    refetch();
  }, [isVisible]);
  return (
    <ThemeProvider theme={palette}>
      {song && data ? (
        <Wrap>
          <SCard
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
            }}
          >
            <ImageWraper>
              <SImage
                src={song?.image_path
                  .replaceAll(" ", "_")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")}
                layout="intrinsic"
                height="500px"
                width="500px"
                quality="100"

              />
              <VisibilityWraper>
                {song?.isPublic ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </VisibilityWraper>
            </ImageWraper>
            <TitleWraper>
              <STypographyTitle>{song?.name}</STypographyTitle>
            </TitleWraper>
            {song ? (
              <DateWrapper>
                <STypographyDate>
                  Created on{" "}
                  {new Date(Number(song.createdDate!)).toLocaleString("cs-CZ")}
                </STypographyDate>
                <STypographyDate>
                  Modified on{" "}
                  {new Date(Number(song.modifiedDate!)).toLocaleString("cs-CZ")}
                </STypographyDate>
              </DateWrapper>
            ) : null}
            <Spacer>
              <VisibilityWraper>
                <BarChartRoundedIcon />
              </VisibilityWraper>
            </Spacer>
            <ViewCountWrapper>
              <IconWrapper>
                <VisibilityRoundedIcon />
              </IconWrapper>
              <STypographyViews>{views}</STypographyViews>
            </ViewCountWrapper>
            <LineGraph
              data={[
                {
                  id: id,
                  data: data,
                },
              ]}
            />
          </SCard>
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
      ) : null}
    </ThemeProvider>
  );
};

export default CardShellStats;

const SCard = styled(Card)`
  height: 80vh;
  width: 90vw;
  max-width: 810px;
  padding-left: 1px;
  margin: 2.5vh auto auto auto;
  overflow: auto;
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
      70px
      60px
      60px
      10px
      200px
      20px;
  @media only screen and (min-width: 376px) {
    grid-template-columns:
      calc((100% - 70vw) / 4)
      calc((100% - 70vw) / 4)
      5vw 15vw 45vw 5vw
      calc((100% - 70vw) / 4)
      calc((100% - 70vw) / 4);
    grid-template-rows:
      20px
      60vw
      30px
      60px
      70px
      60px
      60px
      10px
      200px
      20px;
  }
  @media only screen and (min-width: 425px) {
    grid-template-columns:
      calc((100% - 70vw) / 4) calc((100% - 70vw) / 4) 7vw 13vw 43vw 7vw calc(
        (100% - 70vw) / 4
      )
      calc((100% - 70vw) / 4);
    grid-template-rows:
    20px
      60vw
      30px
      60px
      70px
      60px
      60px
      10px
      200px
      20px;
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
      13.333vw
      13.333vw
      calc(13.333vw + 30px)
      60px
      60px
      60px
      10px
      300px
      20px;
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
      100px
      100px
      130px
      60px
      60px
      60px
      10px
      300px
      20px;
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
  width: 100vw;
`;


const SImage = styled(Image)`
  border-radius: 15px;
`;

const ImageWraper = styled.div`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  @media only screen and (min-width: 376px) {
    grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 3;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 7;
  min-height: 192px;
    min-width: 192px;
    height: 40vw;
    width: 40vw;
    max-height: 300px;
    max-width: 300px;
  }
  filter: drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.2));
  display: flex;
  justify-content: center;
`;

const TitleWraper = styled.div`
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 5;
  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 4;
  grid-row-end: 5;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 5;
    grid-row-end: 6;
  } ;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateWrapper = styled.div`
grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 5;
  grid-row-end: 6;
@media only screen and (min-width: 376px) {
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 5;
  grid-row-end: 6;
}
@media only screen and (min-width: 481px) {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 4;
  } ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VisibilityWraper = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: #2a445e;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -25px;
`;

const STypographyTitle = styled(Typography)`
  font-size: 1.6rem;
  height: 50px;
  line-height: 35px;
  text-align: center;
  font-weight: 1000;
  filter: drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.2));
`;

const STypographyViews = styled(Typography)`
width:100%;
  font-size: 1.6rem;
  line-height: 35px;
  text-align: center;
  font-weight: 1000;
  filter: drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.2));
`;

const STypographyDate = styled(Typography)`
  font-size: 1rem;
  line-height: 30px;
  text-align: center;
  font-weight: 300;
  filter: drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.2));
`;

const Spacer = styled.div`
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 6;
  grid-row-end: 7;
  @media only screen and (min-width: 376px) {
    grid-column-start: 1;
  grid-column-end: 9;
  grid-row-start: 6;
  grid-row-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 6;
    grid-row-end: 7;
  } ;
  height: 20px;
  background-color: #001e3c;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );
  filter: drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.15));
  display: flex;
  justify-content: center;
`;

const ViewCountWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 7;
  grid-row-end: 8;
  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 7;
  grid-row-end: 8;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 7;
    grid-row-end: 8;
  } ;
  background-color: #0b2137;
  border-radius: 15px;
  display: flex;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.div`
  display: flex;
  position:absolute;
  width: 20%;
  svg{
    font-size: 2rem;
  }
  
  justify-content: center;
`;
