import { Button, Typography } from "@mui/material";
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

type CreateItemProps = {
  handleClick : () => void
}

const CreateItem: React.FC<CreateItemProps> = ({handleClick}) => {
  return (
    <Wrapper>
      <CardUnselected>
        <TopDiv>
          <ImagePlace>
            <PlaylistAddRoundedIcon />
          </ImagePlace>
          <TextP variant="body1">Create playlist</TextP>
          <ButtonDivDropdown>
            <StyledRoundButton onClick={handleClick} className="cstmbtn-invis ">
              <AddRoundedIcon className="dropdown" />
            </StyledRoundButton>
          </ButtonDivDropdown>
        </TopDiv>
      </CardUnselected>
    </Wrapper>
  );
};

export default CreateItem;

const Wrapper = styled.div`
  .selected {
    background-color: #4c566a;
  }
`;
const CardUnselected = styled.div`
  background-color: #263A53;
  width: 100%;
  height: 61px;
  margin-top: 3px;
  border-radius: 15px;
  display: block;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const TopDiv = styled.div`
  width: 100%;
  height: 50%;
  .cstmbtn-invis {
    background-color: initial;
  }
`;
const ImagePlace = styled.div`
  background-color: #d8dee9;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  transform: translate(5px, 5px);
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  color: #3b4252;
  align-items: center;
  justify-content: center;
  display: flex;
  svg{
    font-size: 2rem;
  }
  
`;
const ButtonDivDropdown = styled.div`
  width: 48px;
  margin-left: calc(100% - 48px);
  transform: translate(calc(100% - 56px), -73px);
`;

const StyledRoundButton = styled(Button)`
  background-color: #d8dee9;
  max-width: 52px;
  max-height: 52px;
  min-width: 52px;
  min-height: 52px;
  border-radius: 100%;
  transform: translate(0px, 0px);
  margin-right: 5px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));

  .dropdown {
    font-size: 2.7rem !important;
    fill: #d8dee9;
  }
  .iconDark {
    font-size: 1.7rem !important;
    fill: #4c566a;
  }
`;
const TextP = styled(Typography)`
  color: #d8dee9;
  font-size: 1.1rem;
  transform: translate(69px, -34px);
  width: 61%;
`;

const SImage = styled(Image)`
  border-radius: 12px;
`;
