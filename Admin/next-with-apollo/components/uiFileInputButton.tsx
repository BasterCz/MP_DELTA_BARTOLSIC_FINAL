import { ThemeProvider, Button } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { palette } from "../styles/palette";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (
    formData: FormData,
    destination: string,
    type: "file" | "image",
    fileName: string
  ) => void;
  uploadFileName: string;
  destination: string;
  type: "file" | "image";
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [fileName, setFileName] = useState("");

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      console.log(file.name);
      formData.append(event.target.name, file);
      setFileName(file.name);
    });

    props.onChange(formData, props.destination, props.type, fileName);

    formRef.current?.reset();
  };

  return (
    <ThemeProvider theme={palette}>
      {fileName.length === 0 ? (
        <StyledForm ref={formRef}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={onClickHandler}
          >
            {props.label}
          </Button>
          <input
            accept={props.acceptedFileTypes}
            multiple={props.allowMultipleFiles}
            name={props.uploadFileName}
            onChange={onChangeHandler}
            ref={fileInputRef}
            style={{ display: "none" }}
            type="file"
          />
        </StyledForm>
      ) : (
        <StyledContainer>
          <ReactPlayer
            forceAudio
            controls
            url={"/temp/" + fileName.replaceAll(" ", "_")}
            height="55px"
            
          />
        </StyledContainer>
      )}
    </ThemeProvider>
  );
};

UiFileInputButton.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};

const StyledContainer = styled.div`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 5;
  place-self: center;
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

const StyledForm = styled.form`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 5;
  place-self: center;
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
