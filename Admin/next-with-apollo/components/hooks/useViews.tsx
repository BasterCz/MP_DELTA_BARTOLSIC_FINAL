import {
  useAddViewMutation,
  useObjectViewsDateQuery,
  useObjectViewsQuery,
} from "../../__generated__/lib/viewer.graphql";

export const useViewsDate = (_id: string, groupByMinutes: number) => {
  const { data, loading, error, refetch } = useObjectViewsDateQuery({
    variables: { _id: _id, groupByMinutes: groupByMinutes }, pollInterval: 1000
  });
  const dataS = data?.objectViewsDate;
  let last = 0;
  let output: [{ x: string; y: number }] = [
    { x: new Date("2022-1-1").toLocaleString("cs-CZ"), y: 0 },
  ];
  dataS?.map((views) => {
    if (views) {
        output.push({
          x: new Date(Number(views._id)).toLocaleString("cs-CZ"),
          y: last + views.count,
        })
      last = last + views.count;
    }
  });
  output.shift();
  output.push({x: new Date(Date.now()).toLocaleString("cs-CZ"), y: last})
  return {
    data: output,
    refetch: refetch,
  };
};

export const useViews = (_id: string) => {
  const { data, loading, error } = useObjectViewsQuery({
    variables: { _id: _id },
    pollInterval: 500,
  });
  if (data?.objectViews)
  return {
    views: data?.objectViews[0]?.count,
  };
  else return {views: 0};
};

export const useAddView = () => {
  const [addView] = useAddViewMutation();

  return { addView: addView };
};
