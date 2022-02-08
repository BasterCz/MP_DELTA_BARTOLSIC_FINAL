import { Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const HeadTitleSmaller: React.FC = ({children}) => {
  return (
    <OwnTypography>
        {children}
    </OwnTypography>
  );
};
export default HeadTitleSmaller;

const OwnTypography = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  margin:0;
  color: #d8dee9;
`