import ffmpeg from "fluent-ffmpeg";

export default async function hlsCreate(
    sourcePath : string,
    resultPath : string,
    segmentTime = 5
) {
    await ffmpeg()
    .input(sourcePath)
    .addOption([
      `-start_number 0`,
      `-hls_time ${segmentTime}`,
      `-hls_list_size 0`, 
      `-f hls`,
    ])
    .noVideo()
    .output(resultPath)
    .run();
    return true;
  }
  