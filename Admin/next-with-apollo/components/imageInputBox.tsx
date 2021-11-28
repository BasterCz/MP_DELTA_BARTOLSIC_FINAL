import { ThemeProvider, Button, Card } from "@mui/material";
import React, { useState } from "react";
import { palette } from "../styles/palette";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { FormatAlignCenter } from "@mui/icons-material";
import { CSSProperties } from "styled-components";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  onChange: (formData: FormData, destination:string, type: 'file'| 'image', fileName:string) => void;
  uploadFileName: string;
  destination: string;
  type: 'file'| 'image';
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
    <form ref={formRef} style={{
      gridColumnStart: 3,
      gridColumnEnd: 5,
      gridRowStart: 2,
      gridRowEnd: 3,
    }}>
      <Card onClick={onClickHandler} sx={{
        width: '100%',
        height: '100%',
        minHeight: '70vw',
        minWidth: '70vw',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.default',
        border: 1,
        borderStyle: "dashed",
      }}>
        <AddPhotoAlternateOutlinedIcon sx={{
          fontSize: '12vw',
          display: "block",
          margin: "auto",
          opacity: 0.3
          
        }} />
      </Card>
      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </form>
    </ThemeProvider>
  );
};

ImageInputBox.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};