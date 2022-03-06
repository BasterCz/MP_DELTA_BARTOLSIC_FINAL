import React, { useEffect, useContext } from "react";
import { useInput } from "@mui/base";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Song } from "../../__generated__/lib/type-defs.graphqls";
import Image from "next/image";
import SmallTitle from "../typography/smallTitle";
import { Context } from "../../lib/context";

type DetailOfType = "song" | "playlist";

type SearchBarProps = {
  song:
    | ({
        __typename?: "Song" | undefined;
      } & Pick<
        Song,
        | "name"
        | "_id"
        | "file_path"
        | "image_path"
        | "createdDate"
        | "modifiedDate"
        | "isPublic"
      >)
    | null
    | undefined;
  handlerResultClick: (_id: string, _detailOf: DetailOfType) => void;
};

export const ResultCardSong: React.FC<SearchBarProps> = ({
  song,
  handlerResultClick,
}) => {
  const srcPath = "http://localhost:3000" + song?.image_path!;

  return (
    <Wrapper
      onClick={() => {
        handlerResultClick(song!._id, "song");
      }}
    >
      <ImagePlace>
        {song?.image_path ? (
          <SImage src={srcPath} height={"120px"} width={"120px"} />
        ) : null}
      </ImagePlace>
      <SmallTitleContainer>
        <SSmallTitle>{song?.name}</SSmallTitle>
      </SmallTitleContainer>
    </Wrapper>
  );
};

export default ResultCardSong;

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
