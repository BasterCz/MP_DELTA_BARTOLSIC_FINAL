import { useWaveformFindQuery } from "../../lib/viewer.graphql";
import {
  
} from "../../__generated__/lib/viewer.graphql";

export const useWaveform = (_id: string) => {
  const { data, loading, error } = useWaveformFindQuery({
    variables: { _id: _id }
  });
  if (data?.waveformFind)
  return {
    waveform: data?.waveformFind?.waveform,
  };
  else return {waveform: []};
};
