import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PointTooltipProps, ResponsiveLine, Line, Serie } from "@nivo/line";
import styled from "styled-components";
import { Scale } from "@nivo/scales";
import { AxisProps } from "@nivo/axes";
import {
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  useTheme,
} from "@material-ui/core";

type InputProps = {
  data: Serie[];
};

const LineGraph: React.FC<InputProps> = ({ data }) => {
  return (
    <Wrapper>
      <GraphWrapper>
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          xScale={{
            type: "time",
            format: "%d. %m. %Y %H:%M:%S",
            useUTC: false,
            precision: "second",
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve="basis"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: "%-d. %-m. %H:%M",
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            tickValues: 3,
          }}
          xFormat="time:%H:%M:%S"
          axisLeft={{
            tickSize: 5,
            tickPadding: 6,
            tickRotation: 0,
            tickValues: 4,
          }}
          theme={{
            background: "#0B2137",
            textColor: "#E5E9F0",
            
            grid: {
              line: {
                stroke: "#1B344E",
              },
            },
            axis: {
              ticks: {
                line: {
                  stroke: "#1B344E",
                },
              },
            },
          }}
          gridYValues={5}
          enableGridX={false}
          colors={{ scheme: "category10" }}
          lineWidth={2}
          enablePoints={false}
          pointSize={2}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.6}
          useMesh={true}
          legends={[]}
          enableSlices={"x"}
          isInteractive
          sliceTooltip={({ slice }) => {
            return (
              <div style={{}}>
                {slice.points.map((point) => (
                  <div
                    key={point.id}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "#009688",
                      padding: "5px",
                      borderRadius: "2px",
                    }}
                  >
                    {point.data.yFormatted}
                  </div>
                ))}
              </div>
            );
          }}
          animate={true}
        />
      </GraphWrapper>
    </Wrapper>
  );
};
export default LineGraph;

const GraphWrapper = styled.div`
  height: 100%;
  width: 100%;
  div svg { 
    border-radius: 15px;
  }
`;

const Wrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 9;
  grid-row-end: 10;
  @media only screen and (min-width: 376px) {
    grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 9;
  grid-row-end: 10;
  }
  @media only screen and (min-width: 481px) {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 9;
    grid-row-end: 10;
  } ;
  filter: drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.10));
`;
