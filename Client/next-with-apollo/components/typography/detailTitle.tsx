import { Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";



export const DetailTitle: React.FC = ({children}) => {
  return (
    <OwnTypography>
        {children}
    </OwnTypography>
  );
};
export default DetailTitle;

const OwnTypography = styled.h2`
display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center; 
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  margin-left:30px;
  margin-right:30px;
  color: #d8dee9;
`