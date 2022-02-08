import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const SubTitle: React.FC = ({children}) => {
  return (
    <STypography>
        {children}
    </STypography>
  );
};
export default SubTitle;

const STypography = styled.h2`
  font-family: 'Varela Round', sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  color: #d8dee9;
`