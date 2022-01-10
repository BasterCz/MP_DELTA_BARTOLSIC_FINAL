import type { NextPage } from 'next'
import { useState } from 'react'
import ReactPlayer from 'react-player'

const Home: NextPage = () => {
  const [videoFilePath, setVideoFilePath] = useState(null);

  return (
    <div>
      <ReactPlayer
        controls
        url="audio/Debussy_-_Clair_de_Lune/Debussy_-_Clair_de_Lune.m3u8"
      />
    </div>
  )
}

export default Home
