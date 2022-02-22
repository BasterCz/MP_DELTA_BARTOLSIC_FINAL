import { waveformAdd } from "../extensions/api/mongoapi";

export const waveformUploadMongoDB = async (id: string, waveform: number[]
  ) => {
  return await waveformAdd( id, waveform );
}
export default waveformUploadMongoDB

