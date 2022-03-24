import { useEffect, useState } from "react";
import { useWaveformFindQuery } from "../../lib/viewer.graphql";
import {} from "../../__generated__/lib/viewer.graphql";

export const useWaveform = (_id: string) => {
  const { data, loading, error, refetch } = useWaveformFindQuery({
    variables: { _id: _id },
  });
  if (data?.waveformFind)
    return {
      waveform: data?.waveformFind?.waveform,
      refetchWaveform: refetch,
    };
  else return { waveform: [], refetchWaveform: refetch };
};

export const useWaveforms = (_ids: string[] | undefined) => {
  const [waveforms, setWaveforms] = useState<number[][]>([]);
  const { data, refetch } = useWaveformFindQuery({
    variables: { _id: "" },
  });

  useEffect(() => {
    if (_ids)
      setWaveforms([
        ..._ids.map((id) => {
          refetch({_id: id})
          return data?.waveformFind?.waveform
            ? data?.waveformFind?.waveform
            : [];
        }),
      ]);
  }, [_ids])

  return { waveforms: waveforms };
};
