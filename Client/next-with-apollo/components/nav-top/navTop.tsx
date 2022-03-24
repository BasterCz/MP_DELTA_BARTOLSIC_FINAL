import { Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BadgeAvatars from "./avatar";
import { useUser } from '@auth0/nextjs-auth0';
import Link from "next/link";

export const NavTop: React.FC = () => {
  const {user, error, isLoading} = useUser();
  return (
    <Nav>
      <SIconButton>
        <SettingsOutlinedIcon />
      </SIconButton>
      {console.log(user)}
      {user?<BadgeAvatars name={user.nickname as string} src={user.picture as string} loading={isLoading}/>:<a href="/api/auth/login?redirect_uri=http://localhost:4000/listen/search">Login</a>}
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
