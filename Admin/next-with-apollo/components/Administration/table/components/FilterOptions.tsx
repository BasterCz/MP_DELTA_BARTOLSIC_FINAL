import {
  Box,
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import React from "react";
import styled from "styled-components";

type Order = "asc" | "desc";

type Data = {
  _id: string;
  image_path: string;
  name: string;
  file_path: string;
  isPublic: boolean;
  modifiedDate: string;
  createdDate: string;
};

type FilterOprionsProps = {
  _order: Order;
  _orderBy: keyof Data;
  refOrderBy: (
    orderBy: keyof Data,
    order: Order
  ) => void;
};

export const FilterOptions: React.FC<FilterOprionsProps> = ({
  _order,
  _orderBy,
  refOrderBy,
}) => {
  const [order, setOrder] = React.useState(_order);
  const [orderBy, setOrderBy] = React.useState(_orderBy);
  
  const handleSetOrderBy = (event: SelectChangeEvent<keyof Data> ) => setOrderBy((event as SelectChangeEvent<keyof Data>).target.value as keyof Data);
  const handleSetOrder = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: Order) => {if(value !== null) setOrder(value)};
  
  return (
    <FormControl fullWidth sx={{display: 'inline-flex', flexDirection: 'row', alignItems: "center"}}>
      <Box sx={{width:'10%', margin: '10px'}} onClick={()=>{setOrder(order === 'asc'? order : 'desc');refOrderBy(orderBy, order === 'asc'? order : 'desc')}}>{order === "desc"? (<ArrowDownwardRoundedIcon sx={{display: 'block', margin: 'auto'}}/>) : (<ArrowUpwardRoundedIcon sx={{display: 'block', margin: 'auto'}}/>)}</Box>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={_orderBy}
        inputProps={{ 'aria-label': 'Without label'}}
        onChange={(event) => {handleSetOrderBy(event); refOrderBy(event.target.value as keyof Data, order)}}
        sx={{width: '90%'}}
      >
        <SListSubheader>
          <ToggleButtonGroup
            color="primary"
            value={_order}
            exclusive
            onChange={(event,value) => {handleSetOrder(event,value); refOrderBy(orderBy, value === null? order : value)}}
          >
            <ToggleButton value="asc">
              <ArrowUpwardRoundedIcon />
            </ToggleButton>
            <ToggleButton value="desc">
              <ArrowDownwardRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </SListSubheader>
        <MenuItem value={"_id"}>ID</MenuItem>
        <MenuItem value={"name"}>Name</MenuItem>
        <MenuItem value={"isPublic"}>Public</MenuItem>
        <MenuItem value={"modifiedDate"}>Modified date</MenuItem>
        <MenuItem value={"createdDate"}>Created date</MenuItem>
        <MenuItem value={"file_path"}>File path</MenuItem>
        <MenuItem value={"image_path"}>Image path</MenuItem>
      </Select>
    </FormControl>
  );
};
export default FilterOptions;

const SListSubheader = styled(ListSubheader)`
display: flex;
background-color: inherit;
* {
    margin: 2px;
}
`;