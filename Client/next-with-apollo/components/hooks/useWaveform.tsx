import { useEffect, useState } from "react";
import { useWaveformFindQuery, useWaveformsFindQuery} from "../../__generated__/lib/viewer.graphql";

export const useWaveform = (_id: string) => {
  const [waveform, setWaveform] = useState<number[] | undefined>([]);
  const { data, loading, error, refetch, startPolling, stopPolling } = useWaveformFindQuery({
    variables: { _id: _id },
  });

  useEffect(() => {
    refetch({ _id: _id });
    if(!data) {
      startPolling(100);
    }
    else {
      stopPolling();
    }
}, [_id, data])

useEffect(() => {
  setWaveform(data?.waveformFind?.waveform as number []); 
}, [data])


    return {
      waveform: waveform,
      refetchWaveform: refetch,
    };
};

export const useWaveforms = (_ids: string[] ) => {
  const [waveforms, setWaveforms] = useState<number[][] | undefined>([]);
  const { data, refetch, startPolling, stopPolling} = useWaveformsFindQuery({
    variables: { _ids: _ids },
  });

  useEffect(() => {
    refetch({ _ids: _ids });
    if(!data) {
      startPolling(100);
    }
    else {
      stopPolling();
    }
}, [_ids, data])

useEffect(() => {
  setWaveforms(data?.waveformsFind?.map(waveform => waveform?.waveform as number [])); 
}, [data])

  return { waveforms: waveforms };
};
