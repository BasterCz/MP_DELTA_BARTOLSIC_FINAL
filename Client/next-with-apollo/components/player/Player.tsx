import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { ReactJkMusicPlayerProps } from "react-jinke-music-player";
import styles from 'react-jinke-music-player/assets/index.module.css'

export const Player = (options: ReactJkMusicPlayerProps) => <ReactJkMusicPlayer {...options}/>;

export default Player;

