import type { NextPage } from "next";
import * as React from "react";
import CardAddSong from "../../../components/Administration/cards/CardAddSong";


const AdminAddSong: NextPage = () => {
  const [cardSongVisibe,setCardSongVisible] = React.useState(true)
  return(
    <CardAddSong setCreateSongVisible={() => setCardSongVisible(!cardSongVisibe)}/>
  );
};

export default AdminAddSong;

