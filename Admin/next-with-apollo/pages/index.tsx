import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import styles from '../styles/Home.module.css'

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
