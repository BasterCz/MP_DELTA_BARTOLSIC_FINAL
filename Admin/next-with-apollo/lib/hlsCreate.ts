const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

export default function hlsCreate(
  sourcePath: string,
  resultPath: string,
  resultFileName: string,
  segmentTime = 5
) {
  
  if (!fs.existsSync(resultPath)) {
    fs.mkdirSync(resultPath);
    
  }
  
  if (!fs.existsSync(resultFileName)) {
    console.log(
      ffmpeg()
        .input(sourcePath)
        .addOption([
          `-start_number 0`,
          `-hls_time ${segmentTime}`,
          `-hls_list_size 0`,
          `-crf 0`,
          `-f hls`,

        ])
        .noVideo()
        .output(resultFileName)
        .on(
          "error",
          function (err: { message: any }, stdout: string, stderr: string) {
            if (err) {
              console.log(err.message);
              console.log("stdout:\n" + stdout);
              console.log("stderr:\n" + stderr);
            }
          }
        )
        .run()
    );
  }
  return true;
}
