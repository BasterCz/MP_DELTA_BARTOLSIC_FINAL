import React from "react";
import styled from "styled-components";

type Props = { time : number}
export const ProgressShadowTop: React.FC<Props> = ({time}) => {
  return <Wrapper style={{width: `${time}%`}}><Progress/></Wrapper>;
};
export default ProgressShadowTop;

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 5px;
  top: 0px;

  z-index: 7;
`;

const Progress = styled.div`
  width: 100%;
  height: 1px;
  background-color: #A3BE8C;
  filter: drop-shadow(0px 1px 5px #A3BE8C);
`;
