import { ThemeProvider, Button } from "@mui/material";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
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
  editFileName,
}) => {
  const [fileName, setFileName] = useState("");
  const [setted, setSetted] = useState(false);
  const [changed, setChanged] = useState(true);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  if (editFileName !== undefined && !setted) {
    setFileName(editFileName);
    setChanged(false);
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
      setChanged(true)
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
          <StyledForm ref={formRef}>
            <SButton
              variant="contained"
              color="primary"
              type="button"
              onClick={onClickHandler}
            >
              <FileUploadRoundedIcon className="iconDark"/>
            </SButton>
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
          <ReactPlayer
            forceAudio
            controls
            url={!changed ? fileName : "/temp/" + fileName.replaceAll(" ", "_")}
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
  display: flex;
  width: 100%;

  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
    grid-column-end: 8;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 8;
    grid-row-end: 9;
  }
  div {
    height: 55px !important;
    width: 100% !important;
  }
`;

const StyledForm = styled.form`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 5;
  place-self: center;
  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
    grid-column-end: 8;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 8;
    grid-row-end: 9;
  } ;
`;

const SButton = styled(Button)`
  margin: 0px 7px 0px 0px;
  background-color: white;
  max-width: 55px;
  max-height: 55px;
  min-width: 55px;
  min-height: 55px;
  border-radius: 100%;
  .iconDark {
    font-size: 1.8rem !important;
    fill: black;
  }
`