import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const SmallTitle: React.FC = ({children}) => {
  return (
    <STypography>
        {children}
    </STypography>
  );
};
export default SmallTitle;

const STypography = styled.h2`
  font-family: 'Varela Round', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  color: #d8dee9;
`