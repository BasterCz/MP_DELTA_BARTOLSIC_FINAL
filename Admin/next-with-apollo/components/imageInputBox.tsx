import { ThemeProvider, Button, Card } from "@mui/material";
import React, { useState } from "react";
import { palette } from "../styles/palette";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { FormatAlignCenter } from "@mui/icons-material";
import styled, { CSSProperties } from "styled-components";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
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

export const ImageInputBox: React.FC<IProps> = (props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    var fileName = "";

    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      console.log(file.name);
      formData.append(event.target.name, file);
      fileName = file.name;
    });

    props.onChange(formData, props.destination, props.type, fileName);

    formRef.current?.reset();
  };

  return (
    <ThemeProvider theme={palette}>
      <StyledForm ref={formRef}>
        <SCard
          onClick={onClickHandler}
          sx={{
            bgcolor: "background.default",
          }}
        >
          <AddPhotoAlternateOutlinedIcon
            sx={{
              fontSize: "12vw",
              display: "block",
              margin: "auto",
              opacity: 0.3,
            }}
          />
        </SCard>
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
    </ThemeProvider>
  );
};

ImageInputBox.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};

const StyledForm = styled.form`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  @media only screen and (min-width: 376px) {
    grid-column-start: 4;
    grid-column-end: 6;
  }
`;

const SCard = styled(Card)`
  width: 100%;
  height: 100%;
  min-height: 70vw;
  min-width: 70vw;
  text-align: center;
  display: flex;
  justify-content: center;
  border: 1;
  border-style: dashed;
  @media only screen and (min-width: 376px) {
    min-height: 60vw;
    min-width: 60vw;
  };
  @media only screen and (min-width: 425px) {
    min-height: 56vw;
    min-width: 56vw;
  };
`;
