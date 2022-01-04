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
import { Box } from "@mui/system";

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
  editBtnRef: React.RefObject<HTMLButtonElement>;
};

const SongItem: React.FC<InputProps> = (props: InputProps) => {
  return (
    <Wrapper>
      {props.selected ? (
        <Card className={props.selectedToArray ? "selected" : ""}>
          <TopDiv>
            <ImagePlace onClick={props.onClickMark}>
              <SImage src={props.image_path} height={"61px"} width={"61px"} />
            </ImagePlace>
            <TextP>{props.name}<div> </div></TextP>
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
              <PlayArrowRoundedIcon className="play" />
            </StyledRoundButton>
            <ButtonGroup>
              <StyledRoundButton className="cstmbtn-green cstmbtn-stats">
                <AssessmentRoundedIcon className="iconDark" />
              </StyledRoundButton>
              <StyledRoundButton ref={props.editBtnRef} value={props.id} className="cstmbtn-blue cstmbtn-edit">
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
            <TextP>{props.name}<div> </div></TextP>
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

export default SongItem;

const Wrapper = styled.div`
  .selected {
    background-color: #4c566a;
  }
`;

const Card = styled.div`
  background-color: #3b4252;
  width: calc(100vw - 20px);
  height: 126px;
  border-radius: 15px;
  display: block;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const CardUnselected = styled.div`
  background-color: #3b4252;
  width: calc(100vw - 20px);
  height: 61px;
  border-radius: 15px;
  display: block;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const TopDiv = styled.div`
  width: 100%;
  height: 50%;
  .cstmbtn-invis {
    background-color: initial;
    transform: translate(0px, 6px);
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
    transform: translate(6px, 4px);
  }
`;
const ImagePlace = styled.div`
  background-color: #d8dee9;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  transform: translate(5px, 5px);
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const ButtonGroup = styled.div`
  transform: translate(calc(100% - 173px), -48px);
  width: 171px;
  margin-left: calc(100% - 171px);
`;
const ButtonDivDropdown = styled.div`
  width: 48px;
  margin-left: calc(100% - 48px);
  transform: translate(calc(100% - 56px), -78px);
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
    font-size: 3rem !important;
    fill: #d8dee9;
  }
  .iconDark {
    font-size: 1.7rem !important;
    fill: #4c566a;
  }
  .play {
    font-size: 2.2rem !important;
    fill: #4c566a;
  }
`;
const TextP = styled(Box)`
  color: #d8dee9;
  font-size: 1.1rem;
  transform: translate(69px, -34px);
  width: calc(100% - 120px);
  height: 27px;
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1.0) 95%, transparent);
  div {
    min-width: 20px;
    height: 27px;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SImage = styled(Image)`
  border-radius: 12px;
`;
