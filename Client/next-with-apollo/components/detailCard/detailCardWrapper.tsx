import { Button, Card, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import styled from "styled-components";

type DetailCardWrapperProps = {
  handlerDetailClose: () => void;
};

export const DetailCardWrapper: React.FC<DetailCardWrapperProps> = ({
  children,
  handlerDetailClose,
}) => {
  return (
    <Wrapper>
      <CardWrapper>
        <CloseButton onClick={handlerDetailClose}>
          <CloseRoundedIcon />
        </CloseButton>
        {children}
      </CardWrapper>
    </Wrapper>
  );
};
export default DetailCardWrapper;

const Wrapper = styled.div`
  z-index: 3;
  width: 100vw;
  height: 87vh;
`;

const CardWrapper = styled(Card)`
  position: fixed;
  top: 7vh;
  left: 5vw;
  height: 80vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(20, 23, 28, 0.9);
  border-radius: 15px;
  backdrop-filter: blur(7px);
  filter: drop-shadow(1px -4px 4px rgba(0, 0, 0, 0.1));
  z-index: 3;
`;

const CloseButton = styled(Button)`
  z-index: 3;
  align-self: flex-end;
  border-radius: 100%;
  svg {
    min-width: 38px;
    min-height: 38px;
    color: #d8dee9;
  }
`;
