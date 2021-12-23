import * as React from "react";
import { alpha, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Image from "next/image";
import { useSongMultiple } from "./hooks/useSongs";
import { palette } from "../styles/palette";
import styled from "styled-components";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
type Data = {
  _id: string;
  image_path: string;
  name: string;
  file_path: string;
  isPublic: boolean;
  modifiedDate: string;
  createdDate: string;
};

type Order = "asc" | "desc";

const createData = (
  _id: string,
  image_path: string,
  name: string,
  file_path: string,
  isPublic: boolean,
  modifiedDate: string,
  createdDate: string
): Data => {
  return {
    _id,
    image_path,
    name,
    file_path,
    isPublic,
    modifiedDate,
    createdDate,
  };
};

// * Head of table

type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  width: number;
};

const headCells: readonly HeadCell[] = [
  // {
  //   id: "_id",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "ID",
  // },
  // {
  //   id: "image_path",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Image",
  // },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    width: 9/10
  },
  // {
  //   id: "file_path",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "File",
  // },
  {
    id: "isPublic",
    numeric: false,
    disablePadding: false,
    label: "Is Public",
    width: 1/10
  },
  // {
  //   id: "modifiedDate",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Modified Date",
  // },
  // {
  //   id: "createdDate",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Created Date",
  // },
];

type EnhancedTableProps = {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{width:"60px"}}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{width: headCell.width}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type EnhancedTableToolbarProps = {
  numSelected: number;
};

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Songs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export const EnhancedTable: React.FC = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("_id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedPanel, setSelectedPanel] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { songs } = useSongMultiple();
  const rows = songs?.map((song) => {
    return createData(
      song?._id as string,
      song?.image_path as string,
      song?.name as string,
      song?.file_path as string,
      song?.isPublic as boolean,
      song?.modifiedDate as string,
      song?.createdDate as string
    );
  });
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n) => n?._id);
      setSelected(newSelecteds as string[]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handlePanelClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selectedPanel === name;
    let newSelected = "";

    if (!selectedIndex) {
      newSelected = name;
    } else {
      newSelected = "";
    }
    setSelectedPanel(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isSelectedPanel = (name: string) => selectedPanel === name;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (rows ? rows.length : 0))
      : 0;

  return (
    <ThemeProvider theme={palette}>
      <SBox sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length ?? 0}
              />
              <TableBody>
                {rows
                  ?.sort((a, b) =>
                    order === "asc"
                      ? typeof a[orderBy] === "boolean"
                        ? +a[orderBy] - +b[orderBy]
                        : (a[orderBy] as string).localeCompare(
                            b[orderBy] as string,
                            undefined,
                            { numeric: true, sensitivity: "base" }
                          )
                      : typeof a[orderBy] === "boolean"
                      ? +b[orderBy] - +a[orderBy]
                      : (b[orderBy] as string).localeCompare(
                          a[orderBy] as string,
                          undefined,
                          { numeric: true, sensitivity: "base" }
                        )
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const isPanelSelected = isSelectedPanel(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handlePanelClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">
                          <Image
                            onClick={(event) => handleClick(event, row._id)}
                            src={row.image_path}
                            height={"60px"}
                            width={"60px"}
                          />
                        </TableCell>
                        
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="right">{row.isPublic? (<VisibilityIcon/>) : (<VisibilityOffIcon/>)}</TableCell>
                        {isPanelSelected?
                        (<div>
                          {/* <TableCell align="right">{row.file_path}</TableCell> */}
                        <TableCell align="right">
                          {new Date(
                            Number(row.modifiedDate)
                          ).toLocaleDateString("cs-CZ")}{" "}
                          {new Date(
                            Number(row.modifiedDate)
                          ).toLocaleTimeString("cs-CZ")}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(Number(row.createdDate)).toLocaleDateString(
                            "cs-CZ"
                          )}{" "}
                          {new Date(Number(row.createdDate)).toLocaleTimeString(
                            "cs-CZ"
                          )}
                        </TableCell>
                        </div>) :
                        (<div></div>)
                      }
                      </TableRow>
                      
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33  * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </SBox>
    </ThemeProvider>
  );
};

export default EnhancedTable;

const SBox = styled(Box)``;
