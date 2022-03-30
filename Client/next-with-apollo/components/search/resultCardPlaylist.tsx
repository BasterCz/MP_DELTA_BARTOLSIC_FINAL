import React from "react";
import { useInput } from "@mui/base";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Playlist, Song } from "../../__generated__/lib/type-defs.graphqls";
import Image from "next/image";
import SmallTitle from "../typography/smallTitle";


type DetailOfType = "song" | "playlist";

type SearchBarProps = {
  playlist:
    | ({
        __typename?: "Playlist" | undefined;
      } & Pick<
        Playlist,
        | "_id"
        | "name"
        | "description"
        | "songs"
        | "image_path"
        | "isPublic"
        | "createdDate"
        | "modifiedDate"
        | "_deleted"
      >)
    | null
    | undefined;
    handlerResultClick: (_id: string, _detailOf: DetailOfType) => void;
};

export const ResultCardPlaylist: React.FC<SearchBarProps> = ({ playlist, handlerResultClick }) => {
  const srcPath = "http://164.92.167.169:3000" + playlist?.image_path!;
  return (
    <Wrapper onClick={()=>{handlerResultClick(playlist!._id, "playlist")}}>
      <ImagePlace>
        {playlist?.image_path ? (
          <SImage src={srcPath} height={"120px"} width={"120px"}/>
        ) : null}
      </ImagePlace>
      <SmallTitleContainer>
        <SSmallTitle>{playlist?.name}</SSmallTitle>
      </SmallTitleContainer>
    </Wrapper>
  );
};

export default ResultCardPlaylist;

const Wrapper = styled.div`
  display: flex;
  margin: 0px 5px;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 100px;
  min-width: 130px;
  height: 200px;
  background-color: #282d38;
`;
const ImagePlace = styled.div`
  background-color: #d8dee9;
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
  border-radius: 10px;
  margin: 4px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;

const SImage = styled(Image)`
  border-radius: 10px;
`;
const SmallTitleContainer = styled.div`
  margin: 5px 10px;
`;
const SSmallTitle = styled(SmallTitle)`
  text-align: center;
`;
