import { ThemeProvider, Button } from "@mui/material";
import React, { useState } from "react";
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
    </ThemeProvider>
  );
};

UiFileInputButton.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};

const StyledForm = styled.form`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 5;
  place-self: center;
`;
