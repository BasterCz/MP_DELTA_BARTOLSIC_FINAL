import { Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import axios from "axios";
import { useAddView } from "../../../hooks/useViews";

type InputProps = {
  playlistID: string;
  id: string;
  src: string;
  image_path: string;
  name: string;
  onPlayClick: (_src: string, _name: string) => void;
};

const removeHandle = async (id: string, playlistID: string) => {

  await axios.post(
    "/api/playlistRemoveSong",
    {},
    {
      headers: {
        id: playlistID as string,
        song: id as string,
      },
    }
  );
};

const SongItem: React.FC<InputProps> = ({
  id,
  playlistID,
  image_path,
  name,
  src,
  onPlayClick,
}) => {
  const { addView } = useAddView();
  return (
    <Wrapper>
      <CardUnselected>
        <TopDiv>
          <ImagePlace>
            <SImage src={image_path} height={"61px"} width={"61px"} />
          </ImagePlace>
          <TextP>
            {name}
            <div> </div>
          </TextP>
          <ButtonDivDropdown>
            <StyledRoundButton
              className="cstmbtn-red"
              onClick={() => removeHandle(id, playlistID!)}
            >
              <CloseRoundedIcon className="dropdown" />
            </StyledRoundButton>
          </ButtonDivDropdown>
          <ButtonDivPlay>
            <StyledRoundButton
              onClick={() => {
                onPlayClick(src, name);
                addView({ variables: { _id: id } });
                addView({ variables: { _id: playlistID } });
              }}
              className="cstmbtn-blue"
            >
              <PlayArrowRoundedIcon className="dropdown" />
            </StyledRoundButton>
          </ButtonDivPlay>
        </TopDiv>
      </CardUnselected>
    </Wrapper>
  );
};

export default SongItem;

const Wrapper = styled.div`
  width: 99%;
`;
const CardUnselected = styled.div`
  background-color: #003366;
  width: 100%;
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
  }
  .cstmbtn-red {
    background-color: #bf616a;
  }
  .cstmbtn-blue {
    background-color: #1d4a78;
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
const ButtonDivDropdown = styled.div`
  width: 48px;
  margin-left: calc(100% - 48px);
  transform: translate(calc(100% - 56px), -71px);
`;
const ButtonDivPlay = styled.div`
  width: 48px;
  margin-left: calc(100% - 48px);
  transform: translate(calc(100% - 112px), -120px);
`;

const StyledRoundButton = styled(Button)`
  background-color: #d8dee9;
  max-width: 48px;
  max-height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 100%;
  transform: translate(0px, 0px);
  margin-right: 5px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));

  .dropdown {
    font-size: 2.3rem !important;
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
