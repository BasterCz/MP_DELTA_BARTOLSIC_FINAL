import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { PlayerContext } from "../../lib/contextPlayer";
import useStateCallback from "../hooks/useStateCallback";
import waveformAvgChunker from "./waveformAvgChunker";

type paintCanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  waveformData: number[];
  canvasHeight: number;
};

const paintCanvas = ({
  canvasRef,
  waveformData,
  canvasHeight,
}: paintCanvasProps) => {
  const ref = canvasRef.current!;
  const ctx = ref.getContext("2d")!;
  const radius = 1;
  ctx.clearRect(0, 0, ref.width, ref.height);
  waveformData.forEach((p, i) => {
    ctx.beginPath();
    ctx.moveTo(i * (350 / waveformData.length), canvasHeight / 2);
    ctx.lineTo(
      i * (350 / waveformData.length),
      canvasHeight / 2 + p / 2 - radius
    );
    ctx.quadraticCurveTo(
      i * (350 / waveformData.length),
      canvasHeight / 2 + p / 2 - radius,
      i * (350 / waveformData.length) + radius,
      canvasHeight / 2 + p / 2
    );
    ctx.lineTo(
      i * (350 / waveformData.length) + radius + 1,
      canvasHeight / 2 + p / 2
    );
    ctx.quadraticCurveTo(
      i * (350 / waveformData.length) + radius + 1,
      canvasHeight / 2 + p / 2,
      i * (350 / waveformData.length) + 2 * radius + 1,
      canvasHeight / 2 + p / 2 - radius
    );
    ctx.lineTo(
      i * (350 / waveformData.length) + 2 * radius + 1,
      canvasHeight / 2 - p / 2 + radius
    );
    ctx.quadraticCurveTo(
      i * (350 / waveformData.length) + 2 * radius + 1,
      canvasHeight / 2 - p / 2 + radius,
      i * (350 / waveformData.length) + radius + 1,
      canvasHeight / 2 - p / 2
    );
    ctx.lineTo(
      i * (350 / waveformData.length) + radius,
      canvasHeight / 2 - p / 2
    );
    ctx.quadraticCurveTo(
      i * (350 / waveformData.length) + radius,
      canvasHeight / 2 - p / 2,
      i * (350 / waveformData.length),
      canvasHeight / 2 - p / 2 + radius
    );
    ctx.lineTo(i * (350 / waveformData.length), canvasHeight / 2);
    ctx.fillStyle = "#00b8fa";
    ctx.fill();
    //ctx.strokeStyle = "#00b8fa";
    //ctx.stroke();
  });
};
const Waveform: React.FC = () => {
  const {
    audioTime,
    audioCurrentTime,
    audioBufferTime,
    audioInstance,
    isSliderMoving,
    setIsSliderMoving,
    waveformQueue,
    songIndex,
  } = useContext(PlayerContext);

  const [lastCoordinate, setLastCoordinate] = useStateCallback(0);
  const [maskPosition, setMaskPosition] = useState(0);
  const [maskBufferPosition, setMaskBufferPosition] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveformWidth = 346;
  const canvasHeight = 100;

  

  const paintWaveform = useCallback(() => {
    paintCanvas({
      canvasRef,
      waveformData: waveformAvgChunker(waveformQueue[songIndex]),
      canvasHeight,
    });
  }, [songIndex]);

  useEffect(() => {
    if (canvasRef.current) {
      paintWaveform();
    }
  }, [canvasRef, songIndex]);

  const handleMouseMove = useCallback((e) => {
    if (canvasRef.current)
      setLastCoordinate(e.clientX - canvasRef.current.getBoundingClientRect().left);
  }, []);

  const seekTrack = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (audioInstance.current && canvasRef.current) {
      audioInstance.current.currentTime = audioTime * (( e.clientX - canvasRef.current.getBoundingClientRect().left)/waveformWidth);
    }
  };

  const touchMoveSeek = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      setLastCoordinate(
        e.touches[0].clientX - canvasRef.current.getBoundingClientRect().left
      );
    }
  };
  const touchMoveSeekStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      setIsSliderMoving(true);
    }
  };
  const touchMoveSeekEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (canvasRef.current&& audioInstance.current) {
      if(e.cancelable) {
      }
      else{
        audioInstance.current.currentTime = audioTime * ( lastCoordinate/waveformWidth)
      }
      setIsSliderMoving(false);
    }
  };

  useEffect(() => {
    if (isSliderMoving) {
      setMaskPosition(2 * Math.round((lastCoordinate / waveformWidth) * 50));
      setMaskBufferPosition(2 * Math.round((audioBufferTime / audioTime) * 50))
    } else {
      setMaskPosition(2 * Math.round((audioCurrentTime / audioTime) * 50));
      setMaskBufferPosition(2 * Math.round((audioBufferTime / audioTime) * 50))
    }
  }, [lastCoordinate, audioCurrentTime]);

  return (
    <div style={{ padding: 16 }}>
      <SCanvas
        ref={canvasRef}
        height={canvasHeight}
        width={waveformWidth}
        
        onTouchStart={touchMoveSeekStart}
        onTouchMove={touchMoveSeek}
        onTouchEnd={touchMoveSeekEnd}

        onMouseMove={handleMouseMove}
        onMouseEnter={()=>{setIsSliderMoving(true)}}
        onMouseLeave={()=>{setIsSliderMoving(false)}}
        onClick={seekTrack}
        style={{
          height: canvasHeight,
          display: "block",
          WebkitMaskImage: `linear-gradient(to right,#fff 0%,#fff ${maskPosition}%,rgba(255, 255, 255, 0.3) ${maskPosition}%,rgba(255, 255, 255, 0.3) ${maskBufferPosition}%,rgba(255, 255, 255, 0.1) ${maskBufferPosition}%,rgba(255, 255, 255, 0.1) 100%)`,

          maskImage: `linear-gradient(to right,#fff 0%,#fff ${maskPosition}%,rgba(255, 255, 255, 0.3) ${maskPosition}%,rgba(255, 255, 255, 0.3) ${maskBufferPosition}%,rgba(255, 255, 255, 0.1) ${maskBufferPosition}%,rgba(255, 255, 255, 0.1) 100%)`,
        }}
      />
    </div>
  );
};

export default Waveform;

const SCanvas = styled.canvas`
  mask-type: luminance;
  mask-size: 100% 100%;
`;
