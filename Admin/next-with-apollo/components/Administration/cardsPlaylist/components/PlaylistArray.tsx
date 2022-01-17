import * as React from "react";
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import { Chip, List, ListItem } from "@mui/material";
import { SongsQuery } from "../../../../__generated__/lib/viewer.graphql";
import { useState, useEffect } from "react";
import { FormikProps } from "formik";
import { MyFormValues } from "../../../hooks/useFormikUIPlaylist";
import SongItem from "./SongItem";

type PlaylistArrayProps = {
  initialSongs?: SongsQuery["songs"];
  playlistID?: string;
  formikInstance: FormikProps<MyFormValues>;
  onPlayClick: (_src: string, _name: string) => void;
};

export const PlaylistArray: React.FC<PlaylistArrayProps> = ({
  initialSongs,
  formikInstance,
  playlistID,
  onPlayClick,
}) => {
  const [noOfVal, setNoOfVal] = useState(0);
  const [setted, setSetted] = useState(false);
  const [songsValue, setSongs] = useState(initialSongs);

  useEffect(() => {
    if (initialSongs !== undefined && !setted) {
      setSongs(initialSongs);
      formikInstance.setFieldValue("songs", initialSongs);
      setSetted(true);
    }
  }, [initialSongs]);

  var arrayer = initialSongs?.map((a) => {
    let toarray = a;
    return toarray;
  });

  useEffect(() => {
    if (noOfVal !== arrayer?.length) {
      setNoOfVal(arrayer?.length ?? 0);
      formikInstance.setFieldValue("playlists", arrayer);
    }
  });

  if (setted || initialSongs == [])
    return (
      <Root>
        <RelativeDiv className="MuiFormControl-root MuiTextField-root css-1375zuz-MuiFormControl-root-MuiTextField-root">
          <InsiderOutside>
            <Insider>
              <SList>
                {initialSongs?.map((song) => (
                  <SListItem key={song?._id}>
                    <SongItem
                      src={song?.file_path!}
                      playlistID={playlistID!}
                      id={song?._id ?? ""}
                      image_path={song?.image_path ?? ""}
                      name={song?.name ?? ""}
                      onPlayClick={onPlayClick}
                    />
                  </SListItem>
                ))}
              </SList>
            </Insider>
          </InsiderOutside>
        </RelativeDiv>
      </Root>
    );
  else
    return (
      <Input
        disabled={true}
        className="MuiOutlinedInput-input MuiInputBase-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input"
      />
    );
};

export default PlaylistArray;

const Label = styled.label`
  position: absolute;
  :first-of-type.maxed-label {
    color: rgba(255, 255, 255, 0.7);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    padding: 0;
    position: relative;
    display: block;
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 24px);
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform: translate(14px, 16px) scale(1);
    -moz-transform: translate(14px, 16px) scale(1);
    -ms-transform: translate(14px, 16px) scale(1);
    transform: translate(14px, 16px) scale(1);
    -webkit-transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    z-index: 1;
    pointer-events: none;
  }
`;

const SList = styled(List)`
  width: 100%;
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

const RelativeDiv = styled.div`
  position: relative;
`;

const Insider = styled.div`
  overflow-x: auto;
  display: inherit;
  @media only screen and (min-width: 481px) {
    width: calc(100% - 28px);
    display: block;
    width: 100%;
    height: 180px;
  } ;
`;

const InsiderOutside = styled.div`
  width: 100%;

  @media only screen and (min-width: 481px) {
    height: 180px;
  } ;
`;

const Root = styled.div`
  min-width: 100%;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 9;
  grid-row-end: 10;
  @media only screen and (min-width: 376px) {
    grid-column-start: 3;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 8;
    grid-row-end: 9;
  } ;
`;

const Input = styled.input`
  @media only screen and (min-width: 481px) {
    width: calc(100% - 28px);
  } ;
`;
