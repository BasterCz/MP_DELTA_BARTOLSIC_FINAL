
import type { NextPage } from 'next'
import React from 'react'
import ReactPlayer from 'react-player'


const PlayHLS: NextPage = () => {

  return (
      <div>
          <ReactPlayer
            controls
            url="HLS/clairDeLune.m3u8"
          />
      </div> 
    
  )
}

export default PlayHLS
