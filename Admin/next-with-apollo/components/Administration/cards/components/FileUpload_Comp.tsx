import { ThemeProvider, Button } from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { palette } from "../../../../styles/palette";
import FormData from "form-data";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

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
  uploaded: boolean;
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
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
  uploaded,
  setUpload,
}) => {
  const [fileName, setFileName] = useState("");
  const [setted, setSetted] = useState(false);
  const [changed, setChanged] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  if (editFileName !== undefined && !setted) {
    setFileName(editFileName);
    setChanged(false);
    setSetted(true);
    setUpload(true);
  }

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (!event.dataTransfer.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.dataTransfer.files).forEach((file) => {
      formData.append(uploadFileName, file);
      setFileName(file.name);
      onChange(formData, destination, type, file.name);
      setChanged(true);
    });

    formRef.current?.reset();
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    setDragOver(true);
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
      setChanged(true);
    });

    formRef.current?.reset();
  };

  return (
    <ThemeProvider theme={palette}>
      <StyledContainer
        onDragEnter={onDragEnter}
        onDragLeave={() => setDragOver(false)}
        onDragEnd={() => setDragOver(false)}
        onDragExit={() => setDragOver(false)}
        onDropCapture={onDropHandler}
      >
        {!dragOver ? (
          <div>
            {fileName.length === 0 ? (
              <Container>
                <form ref={formRef}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    name={uploadFileName}
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
                </form>
              </Container>
            ) : (
              <Container>
                <form ref={formRef}>
                  <SButton
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={onClickHandler}
                    name={uploadFileName}
                  >
                    <FileUploadRoundedIcon className="iconDark" />
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
                </form>
                {uploaded ? (
                  <ReactPlayer
                    forceAudio
                    controls
                    url={
                      !changed
                        ? fileName
                            .replaceAll(" ", "_")
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                        : "/temp/" +
                          fileName
                            .replaceAll(" ", "_")
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                    }
                  />
                ) : null}
              </Container>
            )}
          </div>
        ) : (
          <DropDown
            onDrop={onDropHandler}
            onDragEnter={(event) => event.preventDefault()}
            onDragOver={(event) => event.preventDefault()}
          >
            <UploadFileRoundedIcon/>
          </DropDown>
        )}
      </StyledContainer>
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

const DropDown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#009688;
  border-radius: 12px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
`;
