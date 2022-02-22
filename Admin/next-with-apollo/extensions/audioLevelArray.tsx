import { useEffect } from "react";

export const getAudioLevels = async (url: string) => {
  if (window) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    return await fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => filterData(audioBuffer))
      .then((filteredData) => normalizeData(filteredData));
  }
  else return [] as number[];
};

export const filterData = (audioBuffer: AudioBuffer) => {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 200; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  return filteredData;
};

const normalizeData = (filteredData: number[]) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};
