import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import waveformAvgChunker from "./waveformAvgChunker";
import useSetTrackProgress from "./useSetTrackProgress";
import styled from 'styled-components';
import { PlayerContext } from '../../lib/contextPlayer';




type pointCoordinatesProps = {
  index: number;
  pointWidth: number;
  pointMargin: number;
  canvasHeight: number;
  amplitude: number;
};
const pointCoordinates = ({
  index,
  pointWidth,
  pointMargin,
  canvasHeight,
  amplitude,
}: pointCoordinatesProps) => {
  const pointHeight = Math.round(amplitude * canvasHeight);
  const verticalCenter = Math.round((canvasHeight - pointHeight) / 2);
  return [
    index * (pointWidth + pointMargin), // x starting point
    canvasHeight - pointHeight - verticalCenter, // y starting point
    pointWidth, // width
    pointHeight, // height
  ];
};
type paintCanvasProps = {
  canvasRef : React.RefObject<HTMLCanvasElement>;
  waveformData: number[];
  canvasHeight : number;
  pointWidth : number;
  pointMargin : number;
  playingPoint : number;
  hoverXCoord : number;
};

const paintCanvas = ({
  canvasRef,
  waveformData,
  canvasHeight,
  pointWidth,
  pointMargin,
  playingPoint,
  hoverXCoord,
}: paintCanvasProps) => {
  const ref = canvasRef.current!;
  const ctx = ref.getContext("2d")!;
  const radius = 1;
  // On every canvas update, erase the canvas before painting
  // If you don't do this, you'll end up stacking waveforms and waveform
  // colors on top of each other
  ctx.clearRect(0, 0, ref.width, ref.height);
  waveformData.forEach((p, i) => {
    ctx.beginPath();
    const coordinates = pointCoordinates({
      index: i*(69/waveformData.length),
      pointWidth,
      pointMargin,
      canvasHeight,
      amplitude: p,
    });
    ctx.moveTo(i*(350/waveformData.length), canvasHeight/2);
    ctx.lineTo(i*(350/waveformData.length), (canvasHeight/2)+(p/2)-radius);
    ctx.quadraticCurveTo(i*(350/waveformData.length), (canvasHeight/2)+(p/2)-radius, i*(350/waveformData.length)+radius, (canvasHeight/2)+(p/2));
    ctx.lineTo(i*(350/waveformData.length)+radius+1, (canvasHeight/2)+(p/2));
    ctx.quadraticCurveTo(i*(350/waveformData.length)+radius+1, (canvasHeight/2)+(p/2), i*(350/waveformData.length)+2*radius+1, (canvasHeight/2)+(p/2)-radius);
    ctx.lineTo(i*(350/waveformData.length)+2*radius+1, (canvasHeight/2)-(p/2)+radius);
    ctx.quadraticCurveTo(i*(350/waveformData.length)+2*radius+1, (canvasHeight/2)-(p/2)+radius, i*(350/waveformData.length)+radius+1, (canvasHeight/2)-(p/2));
    ctx.lineTo(i*(350/waveformData.length)+radius, (canvasHeight/2)-(p/2));
    ctx.quadraticCurveTo(i*(350/waveformData.length)+radius, (canvasHeight/2)-(p/2), i*(350/waveformData.length), (canvasHeight/2)-(p/2)+radius);
    ctx.lineTo(i*(350/waveformData.length), canvasHeight/2);
    const withinHover = hoverXCoord >= coordinates[0];
    const alreadyPlayed = i < playingPoint;
    if (withinHover) {
      ctx.fillStyle = alreadyPlayed ? "#a70909" : "#ffffff";
    } else if (alreadyPlayed) {
      ctx.fillStyle = "#00b8fa";
    } else {
      ctx.fillStyle = "#88bf99";
    }
    ctx.fill();
    ctx.closePath();
  });
};
type WavefromProps = {
  waveformData : number[];
  trackDuration: number;
};
const Waveform : React.FC<WavefromProps> = ({ waveformData, trackDuration }) => {
  const {audioCurrentTime, audioTime} = useContext(PlayerContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chunkedData = waveformAvgChunker(waveformData);
  const waveformWidth = 350;
  const canvasHeight = 100;
  const pointWidth = 2;
  const pointMargin = ((waveformWidth/50)-7)+3;
  const [trackProgress, setTrackProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [trackPlaying, setTrackPlaying] = useState(true);
  const [hoverXCoord, setHoverXCoord] = useState(0);

  const playingPoint =
    ((audioCurrentTime/audioTime)*(50));
  const paintWaveform = useCallback(() => {
    paintCanvas({
      canvasRef,
      waveformData: chunkedData,
      canvasHeight,
      pointWidth,
      pointMargin,
      playingPoint,
      hoverXCoord,
    });
  }, [playingPoint]);

  useSetTrackProgress({
    trackProgress,
    setTrackProgress,
    trackDuration,
    startTime,
    trackPlaying,
  });

  useEffect(() => {
    if (canvasRef.current) {
      paintWaveform();
    }
  }, [canvasRef]);

  useEffect(() => {
    paintWaveform();
  }, [playingPoint]);

  const setDefaultX = useCallback(() => {
    setHoverXCoord(0);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (canvasRef.current)
      setHoverXCoord(
        e.clientX - canvasRef.current.getBoundingClientRect().left
      );
  }, []);

  const seekTrack = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvasRef.current) {
      const xCoord = e.clientX - canvasRef.current.getBoundingClientRect().left;
      const seekPerc = (xCoord * 100) / waveformWidth;
      const seekMs = (trackDuration * seekPerc) / 100;
      setStartTime(Date.now() - seekMs);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <canvas
        style={{ height: canvasHeight, display: 'block' }}
        ref={canvasRef}
        height={canvasHeight}
        width={waveformWidth}
        onBlur={setDefaultX}
        onMouseOut={setDefaultX}
        onMouseMove={handleMouseMove}
        onClick={seekTrack}
      />
    </div>
  );
};

export default Waveform;