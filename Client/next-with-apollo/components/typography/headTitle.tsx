import { Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const HeadTitle: React.FC = ({children}) => {
  return (
    <OwnTypography>
        {children}
    </OwnTypography>
  );
};
export default HeadTitle;

const OwnTypography = styled.h1`
  font-size: 2rem;
  font-family: 'Kanit', sans-serif;
  color: #d8dee9;
  
`