import type { NextPage } from "next";
import { useState } from "react";

import styled from "styled-components";
import { usePlaylistMultiple } from "../../components/hooks/usePlaylist";
import { useSongMultiple } from "../../components/hooks/useSongs";
import ResultCardPlaylist from "../../components/search/resultCardPlaylist";
import ResultCardSong from "../../components/search/resultCardSong";
import SearchBar from "../../components/search/searchBar";
import HeadTitleSmaller from "../../components/typography/headTitleSmaller";
import SubTitle from "../../components/typography/subTitle";
import {
  PlaylistsQuery,
  SongsQuery,
} from "../../__generated__/lib/viewer.graphql";

const Home: NextPage = () => {
  const { fuzzySearch: songFuzzySearch } = useSongMultiple();
  const { fuzzySearch: playlistFuzzySearch } = usePlaylistMultiple();
  const [foundSongs, setFoundSongs] = useState<SongsQuery["songs"]>(null);
  const [foundPlaylists, setFoundPlaylists] =
    useState<PlaylistsQuery["playlists"]>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(songFuzzySearch(event.target.value));
    setFoundSongs(songFuzzySearch(event.target.value) as SongsQuery["songs"]);
    setFoundPlaylists(playlistFuzzySearch(event.target.value) as PlaylistsQuery["playlists"]);
  };

  return (
    <Wrapper>
      <SearchBar handleChange={handleSearchChange} />
      {foundSongs === null && foundPlaylists === null ? (
        [
          <NoResultWrapper>
            <SubTitle>{"Your results will be shown here."}</SubTitle>
          </NoResultWrapper>,
          <Spacer />,
          <RecommendationWrapper>
            <HeadTitleSmaller>
              <RecommendationTitleWrapper>
                {"Recommendations"}
              </RecommendationTitleWrapper>
            </HeadTitleSmaller>
          </RecommendationWrapper>,
        ]
      ) : (
        <ResultWrapper>
          <HeadTitleSmaller>
            <ResultSubTitleWrapper>{"Songs"}</ResultSubTitleWrapper>
          </HeadTitleSmaller>
          <ResultListWrapper>
            <MarginerStart />
            {foundSongs?.map((song) => {
              return <ResultCardSong song={song} />;
            })}
            <MarginerEnd />
          </ResultListWrapper>
          <HeadTitleSmaller>
            <ResultSubTitleWrapper>{"Playlists"}</ResultSubTitleWrapper>
          </HeadTitleSmaller>
          <ResultListWrapper>
            <MarginerStart />
            {foundPlaylists?.map((playlist) => {
              return <ResultCardPlaylist playlist={playlist} />;
            })}
            <MarginerEnd />
          </ResultListWrapper>
        </ResultWrapper>
      )}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;
const ResultWrapper = styled.div`
  height: 700px;
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
  mask-size: 100% ;
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
  height: 20px;
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
