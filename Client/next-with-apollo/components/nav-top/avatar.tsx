import * as React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

type BadgeProps = {
  name: string;
  src: string;
  loading: boolean;
};

export const BadgeAvatars: React.FC<BadgeProps> = ({ name, src, loading }) => {
  return (
    <SStack direction="row" spacing={2}>
      {loading ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt={name} src={src} />
        </StyledBadge>
      ) : (
        <Avatar alt={name} src={src} />
      )}
    </SStack>
  );
};

export default BadgeAvatars;

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: #e6e600;
    color: #e6e600;
    box-shadow: 0 0 0 2px #1e222a;
    &::after {
      position: "absolute";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ripple 1.2s infinite ease-in-out;
      border: 1px solid currentColor;
      content: "";
    }
    @keyframes ripple {
      0% {
        transform: scale(0.8);
        opacity: 1;
      }
      100% {
        transform: scale(2.4);
        opacity: 0;
      }
    }
  }
`;

const SmallAvatar = styled(Avatar)`
  width: 22;
  height: 22;
  border: 2px solid #1e222a;
`;

const SStack = styled(Stack)`
  margin: 15px;
`;
