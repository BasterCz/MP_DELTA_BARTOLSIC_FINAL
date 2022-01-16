const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

export const hlsDelete =(
  resultPath: string,
) => {
  
  if (fs.existsSync(resultPath)) {
    fs.rmSync(resultPath, { recursive: true });
    return true;
  }
  else {
    return false;
  }
  
}
export default hlsDelete;