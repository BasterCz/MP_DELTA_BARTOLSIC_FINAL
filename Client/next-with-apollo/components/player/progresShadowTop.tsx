import React from "react";
import styled from "styled-components";


export const ProgressShadowTop: React.FC = () => {
  return <Wrapper><Progress/></Wrapper>;
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
  width: 90%;
  height: 1px;
  background-color: #A3BE8C;
  filter: drop-shadow(0px 1px 5px #A3BE8C);
`;
