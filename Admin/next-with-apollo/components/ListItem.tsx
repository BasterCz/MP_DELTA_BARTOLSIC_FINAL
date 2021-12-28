import { Button, listItemTextClasses, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

type InputProps = {
  selected: boolean;
  selectedToArray: boolean;
  id: string;
  image_path: string;
  file_path: string;
  name: string;
  onClickDropDown: () => void;
  onClickMark: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
};

const ListItemCustom: React.FC<InputProps> = (props: InputProps) => {
  return (
    <Wrapper>
      {props.selected ? (
        <Card className={props.selectedToArray ? "selected" : ""}>
          <TopDiv>
            <ImagePlace onClick={props.onClickMark}>
              <SImage src={props.image_path} height={"61px"} width={"61px"} />
            </ImagePlace>
            <TextP variant="body1">{props.name}</TextP>
            <ButtonDivDropdown>
              <StyledRoundButton
                className="cstmbtn-invis"
                onClick={props.onClickDropDown}
              >
                <KeyboardArrowUpRoundedIcon className="dropdown" />
              </StyledRoundButton>
            </ButtonDivDropdown>
          </TopDiv>
          <BottomDiv>
            <StyledRoundButton
              ref={props.btnRef}
              name={props.name}
              value={props.file_path}
              className="cstmbtn-white cstmbtn-play"
            >
              <PlayArrowRoundedIcon className="iconDark" />
            </StyledRoundButton>
            <ButtonGroup>
              <StyledRoundButton className="cstmbtn-green cstmbtn-stats">
                <AssessmentRoundedIcon className="iconDark" />
              </StyledRoundButton>
              <StyledRoundButton className="cstmbtn-blue cstmbtn-edit">
                <EditRoundedIcon className="iconDark" />
              </StyledRoundButton>
              <StyledRoundButton className="cstmbtn-red cstmbtn-delete">
                <DeleteRoundedIcon className="iconDark" />
              </StyledRoundButton>
            </ButtonGroup>
          </BottomDiv>
        </Card>
      ) : (
        <CardUnselected className={props.selectedToArray ? "selected" : ""}>
          <TopDiv>
            <ImagePlace onClick={props.onClickMark}>
              <SImage src={props.image_path} height={"61px"} width={"61px"} />
            </ImagePlace>
            <TextP variant="body1">{props.name}</TextP>
            <ButtonDivDropdown>
              <StyledRoundButton
                className="cstmbtn-invis "
                onClick={props.onClickDropDown}
              >
                <KeyboardArrowDownRoundedIcon className="dropdown" />
              </StyledRoundButton>
            </ButtonDivDropdown>
          </TopDiv>
        </CardUnselected>
      )}
    </Wrapper>
  );
};

export default ListItemCustom;

const Wrapper = styled.div`
  .selected {
    background-color: #4c566a;
  }
`;

const Card = styled.div`
  background-color: #3b4252;
  width: 100%;
  height: 158px;
  margin-top: 3px;
  border-radius: 15px;
  display: block;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const CardUnselected = styled.div`
  background-color: #3b4252;
  width: 100%;
  height: 77px;
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
const BottomDiv = styled.div`
  width: 100%;
  height: 50%;
  .cstmbtn-white {
    background-color: #d8dee9;
  }
  .cstmbtn-green {
    background-color: #a3be8c;
  }
  .cstmbtn-blue {
    background-color: #88c0d0;
  }
  .cstmbtn-red {
    background-color: #bf616a;
  }
  .cstmbtn-play {
    transform: translate(8px, 10px);
  }
`;
const ImagePlace = styled.div`
  background-color: #d8dee9;
  width: 61px;
  height: 61px;
  border-radius: 12px;
  transform: translate(8px, 8px);
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const ButtonGroup = styled.div`
  transform: translate(calc(100% - 205px), -51px);
  width: 204px;
  margin-left: calc(100% - 205px);
`;
const ButtonDivDropdown = styled.div`
  width: 61px;
  margin-left: calc(100% - 61px);
  transform: translate(calc(100% - 69px), -78px);
`;

const StyledRoundButton = styled(Button)`
  background-color: #d8dee9;
  max-width: 61px;
  max-height: 61px;
  min-width: 61px;
  min-height: 61px;
  border-radius: 100%;
  transform: translate(0px, 0px);
  margin-right: 7px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));

  .dropdown {
    font-size: 3rem !important;
    fill: #d8dee9;
  }
  .iconDark {
    font-size: 1.9rem !important;
    fill: #4c566a;
  }
`;
const TextP = styled(Typography)`
  color: #d8dee9;
  font-size: 1.1rem;
  transform: translate(77px, -36px);
  width: 260px;
`;

const SImage = styled(Image)`
  border-radius: 12px;
`;
