import { Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import styled from "styled-components";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BadgeAvatars from "./avatar";
import Link from "next/link";
import Context from "../../lib/context";

export const NavTop: React.FC = () => {
  const { userContext } = useContext(Context);
  return (
    <Nav>
      <SIconButton>
        <SettingsOutlinedIcon />
      </SIconButton>
      {userContext && userContext.user && userContext.user.sub ? (
        <a href="/api/auth/logout">
          <BadgeAvatars
            name={userContext.user.nickname as string}
            src={userContext.user.picture as string}
            loading={userContext.isLoading}
          />
        </a>
      ) : (
        <a href="/api/auth/login?redirect_uri=http://localhost:4000/listen/search">
          <Button color="warning" sx={{marginRight: "10px"}} variant="contained">Login</Button>
        </a>
      )}
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
