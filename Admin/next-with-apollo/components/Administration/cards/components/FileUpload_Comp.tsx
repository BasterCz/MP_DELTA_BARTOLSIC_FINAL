import { ThemeProvider, Button } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { palette } from "../../../../styles/palette";

type FileUploadProps = {
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
  editFileName?: string;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  acceptedFileTypes,
  allowMultipleFiles,
  label,
  onChange,
  uploadFileName,
  destination,
  type,
  editFileName
}) => {
  
  const [fileName, setFileName] = useState("");
  const [setted, setSetted] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  if(editFileName !== undefined && !setted) {
    setFileName(editFileName);
    setSetted(true);
  }

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
      setFileName(file.name);
      onChange(formData, destination, type, file.name);
    });

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
            {label}
          </Button>
          <input
            accept={acceptedFileTypes}
            multiple={allowMultipleFiles}
            name={uploadFileName}
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
            url={setted? fileName : "/temp/" + fileName.replaceAll(" ", "_")}
            height="55px"
          />
        </StyledContainer>
      )}
    </ThemeProvider>
  );
};

FileUpload.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};

export default FileUpload;

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
