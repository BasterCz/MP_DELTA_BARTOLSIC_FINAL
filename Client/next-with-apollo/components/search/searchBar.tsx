import React from "react";
import { useInput } from "@mui/base";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({handleChange}) => {
  

  return (
    <Wrapper>
      <CustomInput onChange={handleChange}/>
    </Wrapper>
  );
};

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <InputWrapper {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} placeholder="Search..."/>
      <SearchIcon/>
    </InputWrapper>
  );
});

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100%;
  width: 100vw;
`;

const InputWrapper = styled.div`
  width: 85vw;
  background-color: #3b4252;
  border: none;
  border-radius: 30px;
  padding: 12px 12px;
  transition: all 200ms ease;
  display: flex;

  &:hover {
    border-color: #292e39;
  }

  &:focus {
    outline: 2px solid #3399ff;
    outline-offset: 2px;
  }
  svg { 
    font-size: 1.7rem;
    color: #d8dee9;
  }
`;

const StyledInputElement = styled.input`
  font-size: 1.0rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  width: 100%;
  background-color: transparent;
  border: none;
  margin: 0px 5px 0px 5px;
  color: #B5BCCA;
  ::placeholder{
    color: #6F788A;
  }
  :focus {
    outline: none;
    color: #d8dee9;
  }
`;
