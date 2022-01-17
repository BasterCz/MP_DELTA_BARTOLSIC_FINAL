import { Button, listItemTextClasses, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import { useAddView } from "../../../hooks/useViews";
import { PlaylistsQuery, SongsQuery } from "../../../../__generated__/lib/viewer.graphql";
import HideImageRoundedIcon from '@mui/icons-material/HideImageRounded';
import SongItem from "./SongItem";
import { usePlaylistOne } from "../../../hooks/usePlaylist";

type InputProps = {
  selected: boolean;
  selectedToArray: boolean;
  id: string;
  image_path: string;
  name: string;
  onClickDropDown: () => void;
  onClickMark: () => void;
  onPlayClick: (_src: string, _name: string) => void;
  onEditClick: (_id: string) => void;
  onDeleteClick: (_id: string) => void;
  onStatsClick: (_id: string) => void;
};

const PlaylistItem: React.FC<InputProps> = ({
  selected,
  selectedToArray,
  id,
  image_path,
  name,
  onClickDropDown,
  onClickMark,
  onPlayClick,
  onEditClick,
  onDeleteClick,
  onStatsClick,
}) => {
  const [height, setHeight] = useState(126);
  const [setted, setSetted] = useState(false);

  const { songs } = usePlaylistOne(id, true)

  const MidDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(${height}px - 126px);
  `;
  const Card = styled.div`
    background-color: #3b4252;
    width: calc(100vw - 20px);
    height: ${height}px;
    border-radius: 15px;
    display: block;
    filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  `;

  useEffect(() => {setSetted(false)}, [songs])

  const { addView } = useAddView();
  return (
    <Wrapper>
      {selected ? (
        <Card className={selectedToArray ? "selected" : ""}>
          <TopDiv>
            <ImagePlace onClick={onClickMark}>
              {image_path && image_path !== ""?<SImage src={image_path} height={"61px"} width={"61px"} />:<HideImageRoundedIcon/>}
            </ImagePlace>
            <TextP>
              {name}
              <div> </div>
            </TextP>
            <ButtonDivDropdown>
              <StyledRoundButton
                className="cstmbtn-invis"
                onClick={onClickDropDown}
              >
                <KeyboardArrowUpRoundedIcon className="dropdown" />
              </StyledRoundButton>
            </ButtonDivDropdown>
          </TopDiv>
          <MidDiv>
            {songs?.map((song) => {
              if (!setted) {
                setHeight(126 + 69 * songs?.length + 6);
                setSetted(true);
              }
              return (
                <SongItem
                  key={song?._id + id}
                  id={song?._id!}
                  playlistID={id}
                  onPlayClick={onPlayClick}
                />
              );
            })}
          </MidDiv>
          <BottomDiv>
            <StyledRoundButton className="cstmbtn-white cstmbtn-play">
              <PlayArrowRoundedIcon className="play" />
            </StyledRoundButton>
            <ButtonGroup>
              <StyledRoundButton
                onClick={() => onStatsClick(id)}
                className="cstmbtn-green cstmbtn-stats"
              >
                <AssessmentRoundedIcon className="iconDark" />
              </StyledRoundButton>
              <StyledRoundButton
                onClick={() => onEditClick(id)}
                className="cstmbtn-blue cstmbtn-edit"
              >
                <EditRoundedIcon className="iconDark" />
              </StyledRoundButton>
              <StyledRoundButton
                onClick={() => onDeleteClick(id)}
                className="cstmbtn-red cstmbtn-delete"
              >
                <DeleteRoundedIcon className="iconDark" />
              </StyledRoundButton>
            </ButtonGroup>
          </BottomDiv>
        </Card>
      ) : (
        <CardUnselected className={selectedToArray ? "selected" : ""}>
          <TopDiv>
            <ImagePlace onClick={onClickMark}>
            {image_path && image_path !== ""?<SImage src={image_path} height={"61px"} width={"61px"} />:<HideImageRoundedIcon/>}
            </ImagePlace>
            <TextP>
              {name}
              <div> </div>
            </TextP>
            <ButtonDivDropdown>
              <StyledRoundButton
                className="cstmbtn-invis "
                onClick={onClickDropDown}
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

export default PlaylistItem;

const Wrapper = styled.div`
  .selected {
    background-color: #4c566a;
  }
`;

const CardUnselected = styled.div`
  width: calc(100vw - 20px);
  height: 61px;
  border-radius: 15px;
  display: block;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
  background-color: #3b4252;
`;
const TopDiv = styled.div`
  width: 100%;
  height: 63px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #4c566a;
  }
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
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 95%, transparent);
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
