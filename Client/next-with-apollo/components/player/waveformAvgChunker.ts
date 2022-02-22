const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur)

const chunkFill = (chunkNumber: number, chunkSize: number, arr: number[]) => {
  const len = Number(chunkNumber)
  let idx = 0
  let idy = 0
  const result = []
  arr = arr.map((i) => i*100);
  // While our current chunk index is less than our desired length...
  while (idx < len) {
    if (idy >= arr.length) {
      break
    }
    let chunk
    // If this is the last chunk to be created
    // capture all of the remaining datapoints
    if (idx === len - 1) {
      chunk = arr.slice(idy)
    } else {
      // Otherwise, capture the next chunk of points
      // and update the idy for future point capture
      chunk = arr.slice(idy, idy += chunkSize)
    }
    // Get the average amplitude value of the collected points
    // and add 3 (essentially for visual normalization,
    // you don't want silence to have a height of 0%)
    const ampVal = Math.round(((sum(chunk) / chunk.length)) + 3)

    // Add your new averaged point to the results array
    // so long as it's odd as we need a central point for
    // a nice symmetrical reflection
    result.push(ampVal % 2 ? ampVal : ampVal + 1)
    idx += 1
  }
  console.log(result)
  return result
}

export const waveformAvgChunkers = (waveData: number[]) => {
  const displayableChunks = 50
  const itemsInChunk = Math.floor(waveData.length / displayableChunks)
  const avgChunks = chunkFill(displayableChunks, itemsInChunk, waveData)
  return avgChunks
}

export default waveformAvgChunkers;