import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import styled from "styled-components";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';


  type SelectedType = "feed" | "search" | "library"

  type MainContainerProps = {
    selected: SelectedType;
    handlerChangeSelected: (input: SelectedType) => void;
  };
  
  
  export const NavBottom: React.FC<MainContainerProps> = ({
    selected,
    handlerChangeSelected
  }) => {
    return (
      <Nav>
        <Link href="/listen/feed"><A onClick={() => handlerChangeSelected("feed")}><StyledRoundButton className={selected === "feed"? "selected":""} variant="contained"><HomeRoundedIcon/></StyledRoundButton></A></Link>
        <Link href="/listen/search"><A onClick={() => handlerChangeSelected("search")}><StyledRoundButton className={selected === "search"? "selected":""} variant="contained"><SearchRoundedIcon/></StyledRoundButton></A></Link>
        <Link href="/listen/library"><A onClick={() => handlerChangeSelected("library")}><StyledRoundButton className={selected === "library"? "selected":""} variant="contained"><QueueMusicRoundedIcon/></StyledRoundButton></A></Link>
      </Nav>
    );
  };
  export default NavBottom;
  
  const Nav = styled.div`
    position: fixed;
    bottom: 0;
    height: 70px;
    width: 100%;
    z-index: 1;
    border-radius: 15px 15px 0px 0px;
    background-color: #2E3440;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(1px -4px 4px rgba(0, 0, 0, 0.1));
    .selected {
      height: 75px;
      width: 75px;
      transform: translateY(-25px);
      margin: 0px 5px 0px 5px !important;
      background-color: #88C0D0 !important
    }
    svg { 
      color: #4C566A;
      font-size: 1.9rem;
    }
    .selected svg { 
      color: #ECEFF4;
      font-size: 2.5rem;
    }
  `;
  
  const StyledRoundButton = styled(Button)`
  margin: 0px 10px 0px 10px !important;
  background-color: #D8DEE9 !important;
  height: 65px;
  width: 65px;
  border-radius: 100% !important;
  transform: translateY(-20px);
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;

const A = styled.a`
  -webkit-tap-highlight-color: transparent;
`