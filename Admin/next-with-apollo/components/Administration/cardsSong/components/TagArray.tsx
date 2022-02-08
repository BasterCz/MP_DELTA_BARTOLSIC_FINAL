import * as React from "react";
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import { Chip } from "@mui/material";
import { PlaylistsQuery } from "../../../../__generated__/lib/viewer.graphql";
import { useState, useEffect } from "react";
import { FormikProps } from "formik";
import { MyFormValues } from "../../../hooks/useFormikUISong";

type TagArrayProps = {
  playlists?: PlaylistsQuery["playlists"];
  initialPlaylists?: PlaylistsQuery["playlists"];
  formikInstance: FormikProps<MyFormValues>;
};

export const TagArray: React.FC<TagArrayProps> = ({
  playlists,
  initialPlaylists,
  formikInstance,
}) => {
  const [noOfVal, setNoOfVal] = useState(0);
  const [setted, setSetted] = useState(false);

  useEffect(() => {
    if (initialPlaylists !== undefined && !setted) {
      formikInstance.setFieldValue("playlists", initialPlaylists);
      setSetted(true);
    }
  });

  var arrayer = playlists?.map((a) => {
    let toarray = a;
    return toarray;
  });

  if (!arrayer) {
    arrayer = [
      {
        createdDate: "1",
        description: "No data found.",
        image_path: "-",
        isPublic: true,
        modifiedDate: "1",
        name: "No data found.",
        songs: [],
        __typename: "Playlist",
        _deleted: false,
        _id: "-1",
      },
    ];
  }

  useEffect(() => {
    if (noOfVal !== value.length) {
      setNoOfVal(value.length);
      formikInstance.setFieldValue("playlists", value);
    }
  });

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
    inputValue,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: initialPlaylists ?? [
      {
        createdDate: "1",
        description: "No data found.",
        image_path: "-",
        isPublic: true,
        modifiedDate: "1",
        name: "No data found.",
        songs: [],
        __typename: "Playlist",
        _deleted: false,
        _id: "-1",
      },
    ],
    multiple: true,
    options: arrayer,
    isOptionEqualToValue: (option, value) => {
      return option?._id == value?._id;
    },

    getOptionLabel: (option) => {
      if (option) {
        return option.name;
      } else {
        return "-1";
      }
    },
  });

  if (setted || initialPlaylists == [])
  
    return (
      <Root>
        <RelativeDiv
          {...getRootProps()}
          className="MuiFormControl-root MuiTextField-root css-1375zuz-MuiFormControl-root-MuiTextField-root"
        >
          <Label
            {...getInputLabelProps()}
            className={
              (focused ? "Mui-focused " : "") +
              (value.length !== 0 || inputValue.length !== 0
                ? "MuiFormLabel-filled "
                : "") +
              (value.length === 0 && inputValue.length === 0 && !focused
                ? "maxed-label "
                : "css-1a4xo9e-MuiFormLabel-root-MuiInputLabel-root ") +
              "MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-root MuiFormLabel-colorPrimary"
            }
          >
            Playlists
          </Label>
          <InsiderOutside
            ref={setAnchorEl}
            className={
              (focused ? "Mui-focused " : "") +
              "MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1hvt7ig-MuiInputBase-root-MuiOutlinedInput-root"
            }
          >
            <Insider>
              {value?.map((option, index: number) => {
                var row = option
                  ? option
                  : {
                      createdDate: "1",
                      description: "No data found.",
                      image_path: "-",
                      isPublic: true,
                      modifiedDate: "1",
                      name: "No data found.",
                      songs: [],
                      __typename: "Playlist",
                      _deleted: false,
                      _id: "-1",
                    };
                return (
                  <StyledTag label={row.name} {...getTagProps({ index })} />
                );
              })}
              <Input
                {...getInputProps()}
                className="MuiOutlinedInput-input MuiInputBase-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input"
              />
            </Insider>
            <StyledFieldSet
              aria-hidden="true"
              className="MuiOutlinedInput-notchedOutline css-9425fu-MuiOutlinedInput-notchedOutline"
            >
              <legend
                className={
                  value.length === 0 && inputValue.length === 0 && !focused
                    ? "unshrunk"
                    : "shrunk"
                }
              >
                <span>Playlists</span>
              </legend>
            </StyledFieldSet>
          </InsiderOutside>
        </RelativeDiv>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {(groupedOptions as PlaylistsQuery["playlists"])?.map(
              (option, index) => {
                var row = option
                  ? option
                  : {
                      createdDate: "1",
                      description: "No data found.",
                      image_path: "-",
                      isPublic: true,
                      modifiedDate: "1",
                      name: "No data found.",
                      songs: [],
                      __typename: "Playlist",
                      _deleted: false,
                      _id: "-1",
                    };
                return (
                  <li {...getOptionProps({ option, index })}>
                    <span>{row.name}</span>
                    <CheckIcon fontSize="small" />
                  </li>
                );
              }
            )}
          </Listbox>
        ) : null}
      </Root>
    );
  else return <Input
  disabled={true}
  {...getInputProps()}
  className="MuiOutlinedInput-input MuiInputBase-input css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input"
/>;
};

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

const RelativeDiv = styled.div`
  position: relative;
`;

const StyledFieldSet = styled.fieldset`
  .unshrunk {
    float: unset;
    display: block;
    width: 100%;
    padding: 0;
    height: 11px;
    font-size: 0.75em;
    visibility: hidden;
    max-width: 0.01px;
    -webkit-transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    white-space: nowrap;
  }

  .shrunk {
    float: unset;
    display: block;
    width: auto;
    padding: 0;
    height: 11px;
    font-size: 14px;
    visibility: hidden;
    max-width: 100%;
    -webkit-transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
    transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
    white-space: nowrap;
  }
  .shrunk > span {
    padding-left: 5px;
    padding-right: 5px;
    display: inline-block;
  }
`;

const Insider = styled.div`
  overflow-x: auto;
  display: inherit;
  @media only screen and (min-width: 481px) {
    width: calc(100% - 28px);
    display: block;
    margin: 14px;
    padding: 14px 0 14px 0;
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
  min-width: 70vw;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 8;
  grid-row-end: 9;
  @media only screen and (min-width: 376px) {
    grid-column-start: 3;
    grid-column-end: 7;
  }
  @media only screen and (min-width: 481px) {
    min-width: calc(40vw - 15px);
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 4;
    grid-row-end: 7;
  }
  @media only screen and (min-width: 900px) {
    min-width: 345px;
  }
`;
const Input = styled.input`
  @media only screen and (min-width: 481px) {
    width: calc(100% - 28px);
  } ;
`;

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

const Tag = (props: TagProps) => {
  const { label, onDelete, ...other } = props;
  return (
    <Chip
      label={label}
      variant="outlined"
      onDelete={onDelete}
      color="secondary"
      {...other}
    />
  );
};

const StyledTag = styled(Tag)<TagProps>`
  :first-of-type {
    margin-left: 14px !important;
  }
  margin: auto;
  margin-right: 5px !important;
  @media only screen and (min-width: 481px) {
    :first-of-type {
      margin-left: 0px !important;
    }
    margin-top: 5px;
  } ;
`;

const Listbox = styled.ul`
  margin: 2px 0 0;
  padding: 0;
  position: relative;
  list-style: none;
  background-color: #141414;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected="true"] {
    background-color: #2b2b2b;
    font-weight: 600;
    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #263A53;
    cursor: pointer;
    & svg {
      color: currentColor;
    }
  }
`;
