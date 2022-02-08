import { Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BadgeAvatars from "./avatar";

export const NavTop: React.FC = () => {
  return (
    <Nav>
      <SIconButton>
        <SettingsOutlinedIcon />
      </SIconButton>
      <BadgeAvatars/>
    </Nav>
  );
};
export default NavTop;

const Nav = styled.div`
  position: fixed;
  top: 0;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(1px -4px 4px rgba(0, 0, 0, 0.1));
`;
const SIconButton = styled(IconButton)`
  margin: 7px;
  color: #d8dee9;
  svg {
    font-size: 2.3rem;
    
  }
`;
