import type { NextPage } from "next";

import { useContext, useState } from "react";
import styled from "styled-components";
import {
  useGetLatestPlaylists,
  useGetLatestSongs,
  useMostViewdSongs,
} from "../../components/hooks/useFeed";
import {
  useGetLatestViewdSongs,
  useGetLikeRefs,
  useGetPlaylistRef,
} from "../../components/hooks/useLibrary";
import ResultCardPlaylist from "../../components/search/resultCardPlaylist";
import ResultCardSong from "../../components/search/resultCardSong";
import HeadTitleSmaller from "../../components/typography/headTitleSmaller";
import Context from "../../lib/context";

const Library: NextPage = () => {
  const { handlerResultClick, userContext } = useContext(Context);

  const [maximized, setMaximized] = useState(true);

  const { likeRefs } = useGetLikeRefs(
    userContext?.user?.sub ?? "",
    true,
    true
  );
  const { lastViewd } = useGetLatestViewdSongs(
    userContext?.user?.sub ?? "",
    true,
    true
  );
  const { playlistRefs } = useGetPlaylistRef(
    userContext?.user?.sub ?? "",
    true
  );
  const { viewedSongs } = useMostViewdSongs(true, false);
  const { latestPlaylists } = useGetLatestPlaylists(true, false);
  const { latestSongs } = useGetLatestSongs(true, false);
  const handlerMenuClick = () => {
    setMaximized(!maximized);
  };

  return (
    <Wrapper>
      <ResultWrapper>
        <HeadTitleSmaller>
          <ResultSubTitleWrapper>{"Liked songs"}</ResultSubTitleWrapper>
        </HeadTitleSmaller>
        <ResultListWrapper>
          <MarginerStart />
          {likeRefs?.map((song) => {
            return (
              <ResultCardSong
                song={song}
                handlerResultClick={handlerResultClick}
              />
            );
          })}

          <MarginerEnd />
        </ResultListWrapper>
        <HeadTitleSmaller>
          <ResultSubTitleWrapper>{"Last played songs"}</ResultSubTitleWrapper>
        </HeadTitleSmaller>
        <ResultListWrapper>
          <MarginerStart />
          {lastViewd?.map((song) => {
            return (
              <ResultCardSong
                song={song}
                handlerResultClick={handlerResultClick}
              />
            );
          })}

          <MarginerEnd />
        </ResultListWrapper>
        <HeadTitleSmaller>
          <ResultSubTitleWrapper>{"My playlists"}</ResultSubTitleWrapper>
        </HeadTitleSmaller>
        <ResultListWrapper>
          <MarginerStart />
          {playlistRefs?.map((playlist) => {
            return (
              <ResultCardPlaylist
                playlist={playlist}
                handlerResultClick={handlerResultClick}
              />
            );
          })}
          <MarginerEnd />
        </ResultListWrapper>
      </ResultWrapper>
      <Spacer />
    </Wrapper>
  );
};

export default Library;

const Wrapper = styled.div``;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin: 20px 5px;
`;
const ResultSubTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ResultListWrapper = styled.div`
  width: calc(100% - 15px);
  height: 220px;
  display: flex;
  justify-content: left;
  overflow-x: auto;
  margin: 5px 10px;
  mask-image: linear-gradient(
    to left,
    transparent,
    black 10px,
    black calc(100% - 10px),
    transparent
  );
  mask-size: 100%;
  ::-webkit-scrollbar {
    visibility: hidden;
  }
  ::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
`;
const NoResultWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 5px;
`;
const RecommendationWrapper = styled.div`
  margin: 0px 5px 20px;
`;
const RecommendationTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spacer = styled.div`
  height: 50px;
  background-color: #1e222a;
  box-shadow: 0px 1px 0px #1e222a;
  filter: drop-shadow(0px -7px 3px rgba(0, 0, 0, 0.1));
  border-radius: 15px 15px 0px 0px;
  display: flex;
  justify-content: center;
`;
const MarginerStart = styled.div`
  min-width: 5px;
`;
const MarginerEnd = styled.div`
  min-width: 10px;
`;
