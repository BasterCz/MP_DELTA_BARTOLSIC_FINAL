import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { PlayerContext } from "../../lib/contextPlayer";
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
type WavefromProps = {
  waveformData: number[];
};
const Waveform: React.FC<WavefromProps> = ({ waveformData }) => {
  const {
    audioTimeOne,
    audioTimeTwo,
    activePlayer,
    audioCurrentTime,
    audioBufferTime,
    isSliderMoving,
    setIsSliderMoving,
  } = useContext(PlayerContext);

  const [lastCoordinate, setLastCoordinate] = useState(0);
  const [maskPosition, setMaskPosition] = useState(0);
  const [maskBufferPosition, setMaskBufferPosition] = useState(0);
  const [audioTime, setAudioTime] = useState(audioTimeTwo);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chunkedData = waveformAvgChunker(waveformData);
  const waveformWidth = 346;
  const canvasHeight = 100;

  const paintWaveform = useCallback(() => {
    paintCanvas({
      canvasRef,
      waveformData: chunkedData,
      canvasHeight,
    });
  }, [chunkedData]);

  useEffect(() => {
    if (canvasRef.current) {
      paintWaveform();
    }
  }, [canvasRef]);

  useEffect(() => {
    setAudioTime(activePlayer === 0? audioTimeOne: audioTimeTwo)
  }, [activePlayer]);

  const handleMouseMove = useCallback((e) => {
    // if (canvasRef.current)
    //   console.log(e.clientX - canvasRef.current.getBoundingClientRect().left);
  }, []);

  const seekTrack = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvasRef.current) {
      // const xCoord = e.clientX - canvasRef.current.getBoundingClientRect().left;
      // const seekPerc = (xCoord * 100) / waveformWidth;
      // const seekMs = (trackDuration * seekPerc) / 100;
      //setStartTime(Date.now() - seekMs);
      setLastCoordinate(
        e.clientX - canvasRef.current.getBoundingClientRect().left
      );
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
    if (canvasRef.current) {
      console.log("commited ", lastCoordinate);
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
        onMouseMove={handleMouseMove}
        onTouchStart={touchMoveSeekStart}
        onTouchMove={touchMoveSeek}
        onTouchEnd={touchMoveSeekEnd}
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
