import { ThemeProvider, Card } from "@mui/material";
import React, { useState } from "react";
import { palette } from "../styles/palette";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import styled from "styled-components";
import Image from 'next/image'

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
  const [imageName, setImageName] = useState("");

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();
    console.log(Array.from(event.target.files))
    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
      setImageName(file.name);
      props.onChange(formData, props.destination, props.type, file.name);
    });
    
    
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
          {imageName.length===0 ?
          (<SAddPhotoAlternateOutlinedIcon />)
          :
          (<Image 
            src={"/img/"+imageName}
            width="300px"
            height="300px"
          />)
          }
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
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 7;
  } ;
`;

const SAddPhotoAlternateOutlinedIcon = styled(AddPhotoAlternateOutlinedIcon)`
  font-size: 12vw;
  display: block;
  margin: auto;
  opacity: 0.3;
  @media only screen and (min-width: 751px) {
    font-size: 90px;
  } ;
`;

const SCard = styled(Card)`
  width: 40vw;
  height: 40vw;
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
  }
  @media only screen and (min-width: 425px) {
    min-height: 56vw;
    min-width: 56vw;
  }
  @media only screen and (min-width: 481px) {
    min-height: 192px;
    min-width: 192px;
    height: 40vw;
    width: 40vw;
    max-height: 300px;
    max-width: 300px;
  } ;
`;
