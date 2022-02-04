import * as React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ListItemCustom from "./components/SongItem";
import { alpha, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Pagination,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { palette } from "../../../styles/palette";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { useSongMultiple } from "../../hooks/useSongs";
import FilterOptions from "./components/FilterOptions";
import CardAddSong from "../cardsSong/CardAddSong";
import CreateItem from "./components/CreateItem";
import CardEditSong from "../cardsSong/CardEditSong";
import CardDeleteSong from "../cardsSong/CardDeleteSong";
import CardStatsSong from "../cardsSong/CardStatsSong";

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
  isJsx: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "file_path",
    numeric: false,
    disablePadding: false,
    label: "File",
    width: 1,
    isJsx: true,
  },
];

type EnhancedTableProps = {
  numSelected: number;
  onRequestSort: (orderBy: keyof Data, order: Order) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  isVisible: boolean;
};

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    isVisible = true,
  } = props;
  const createSortHandler = (orderBy: keyof Data, order: Order) => {
    onRequestSort(orderBy, order);
  };

  return (
    <TableHead sx={{ display: isVisible ? "table-caption" : "none" }}>
      <TableRow
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {headCells.map((headCell) =>
          headCell.isJsx ? (
            <STableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: headCell.width }}
            >
              <FilterOptions
                refOrderBy={createSortHandler}
                _orderBy={orderBy as keyof Data}
                _order={order}
              />
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </STableCell>
          ) : (
            <STableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: headCell.width }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => createSortHandler(headCell.id, order)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </STableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

type EnhancedTableToolbarProps = {
  numSelected: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowSongTable: React.Dispatch<React.SetStateAction<boolean>>;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const handleSortBy = () => {};

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, rowCount, onSelectAllClick, setShowSongTable } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        justifyContent: "space-between",
        height: "80px",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
          {numSelected} selected
        </Typography>
      ) : (
        <div>
          <Typography
            sx={{
              flex: "1 1 100%",
              backgroundColor: "rgba(0, 0, 0, 0.001)",
              outline: "0",
              border: "none",
            }}
            variant="h6"
            color="white"
            id="tableTitle"
            component="button"
            onClick={handleClick}
          >
            Songs
          </Typography>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setShowSongTable(false);
              }}
            >
              Playlists
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setShowSongTable(true);
              }}
            >
              Songs
            </MenuItem>
          </Menu>
        </div>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteRounded />
          </IconButton>
        </Tooltip>
      ) : (
        [
          <TextField
            label="Search"
            variant="outlined"
            color="success"
            sx={{ width: "70%" }}
            onChange={props.onSearchChange}
          />,
          <div>
            <Tooltip title="Filter list">
              <IconButton onClick={() => props.setIsVisible(!props.isVisible)}>
                {props.isVisible ? (
                  <ArrowCircleUpRoundedIcon />
                ) : (
                  <ArrowCircleDownRoundedIcon />
                )}
              </IconButton>
            </Tooltip>
          </div>,
        ]
      )}
    </Toolbar>
  );
};

type SettersType = {
  setShowSongTable: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayingName: React.Dispatch<React.SetStateAction<string>>;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
  setSmallPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  smallPlayer: boolean;
};

type EnhancedTableInputProps = {
  setters: SettersType;
};

export const EnhancedTable: React.FC<EnhancedTableInputProps> = ({
  setters,
}) => {
  const {
    setShowSongTable,
    setPlayingName,
    setSrc,
    setSmallPlayer,
    smallPlayer,
  } = setters;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [searchFor, setSearchFor] = React.useState("");

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedPanel, setSelectedPanel] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const [songID, setSongID] = useState("");

  const [sorterVisible, setSorterVisible] = useState(false);
  const [createSongVisible, setCreateSongVisible] = useState(false);
  const [editSongVisible, setEditSongVisible] = useState(false);
  const [deleteSongVisible, setDeleteSongVisible] = useState(false);
  const [statsSongVisible, setStatsSongVisible] = useState(false);
  const [deleteDataLoaded, setDeleteDataLoaded] = useState(false);

  const { songs } = useSongMultiple();

  useEffect(() => {
    if (window) setRowsPerPage(Math.floor(window.innerHeight / 71) - 3);
  });

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

  const handleRequestSort = (_orderBy: keyof Data, _order: Order = order) => {
    setOrder(_order);
    setOrderBy(_orderBy);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n) => n?._id);
      setSelected(newSelecteds as string[]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
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

  const handlePanelClick = (name: string) => {
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
    setPage(newPage - 1);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isSelectedPanel = (name: string) => selectedPanel === name;

  const handleCreateSong = () => {
    setCreateSongVisible(!createSongVisible);
    setSmallPlayer(!smallPlayer);
  };

  const handleEditSong = () => {
    setEditSongVisible(!editSongVisible);
    setSmallPlayer(!smallPlayer);
  };

  const handleDeleteSong = () => {
    setDeleteSongVisible(!deleteSongVisible);
    setSmallPlayer(!smallPlayer);
  };

  const handleStatsSong = () => {
    setStatsSongVisible(!statsSongVisible);
    setSmallPlayer(!smallPlayer);
  };

  const onPlayClick = (_src: string, _name: string) => {
    setSrc(_src);
    setPlayingName(_name);
  };

  const onEditClick = (_id: string) => {
    setSongID(_id);
    handleEditSong();
  };

  const onDeleteClick = (_id: string) => {
    setSongID(_id);
    handleDeleteSong();
  };

  const onStatsClick = (_id: string) => {
    setSongID(_id);
    handleStatsSong();
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFor(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (rows ? rows.length : 0))
      : 0;

  return (
    <ThemeProvider theme={palette}>
      {createSongVisible ? (
        <CardAddSong setCreateSongVisible={handleCreateSong} />
      ) : null}
      {editSongVisible ? (
        <CardEditSong
          songID={songID}
          setEditSongVisible={handleEditSong}
          setDeleteDataLoaded={setDeleteDataLoaded}
          deleteDataLoaded={deleteDataLoaded}
        />
      ) : null}
      {deleteSongVisible ? (
        <CardDeleteSong
          songID={songID}
          setDeleteSongVisible={handleDeleteSong}
        />
      ) : null}
      {statsSongVisible ? (
        <CardStatsSong
          songID={songID}
          setCardVisible={handleStatsSong}
          isVisible={statsSongVisible}
        />
      ) : null}
      <SBox sx={{ width: "100%", backgroundColor: "#2E3440" }}>
        <style jsx global>{`
          body {
            background-color: #2e3440;
          }
        `}</style>
        <EnhancedTableToolbar
          onSelectAllClick={handleSelectAllClick}
          rowCount={rows?.length ?? 0}
          isVisible={sorterVisible}
          setIsVisible={setSorterVisible}
          numSelected={selected.length}
          setShowSongTable={setShowSongTable}
          onSearchChange={onSearchChange}
        />
        <TableContainer sx={{ width: "100vw", display: "contents" }}>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length ?? 0}
              isVisible={sorterVisible}
            />
            <SPagination
              sx={{
                display: sorterVisible ? "table-header-group" : "none",
                height: "50px",
              }}
              count={Math.ceil(
                (rows?.filter((item) =>
                  item.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(
                      searchFor
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                    )
                ).length ?? 0) / rowsPerPage
              )}
              page={page + 1}
              onChange={handleChangePage}
            />
            <TableBody>
              <TableRow
                hover
                role="button"
                tabIndex={-1}
                key="CreateSong"
                sx={{
                  backgroundColor: "initial !important",
                }}
              >
                <STableCell>
                  <CreateItem handleClick={handleCreateSong} />
                </STableCell>
              </TableRow>
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
                .filter((item) =>
                  item.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(
                      searchFor
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                    )
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const isPanelSelected = isSelectedPanel(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return [
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        backgroundColor: "initial !important",
                      }}
                    >
                      <STableCell colSpan={3}>
                        <ListItemCustom
                          selected={isPanelSelected}
                          selectedToArray={isItemSelected}
                          id={row._id}
                          image_path={row.image_path}
                          file_path={row.file_path}
                          name={row.name}
                          onPlayClick={onPlayClick}
                          onStatsClick={onStatsClick}
                          onEditClick={onEditClick}
                          onDeleteClick={onDeleteClick}
                          onClickDropDown={() => handlePanelClick(row._id)}
                          onClickMark={() => handleClick(row._id)}
                        />
                      </STableCell>
                    </TableRow>,
                  ];
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <STableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <SPagination
          count={Math.ceil(
            (rows?.filter((item) =>
              item.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(
                  searchFor
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                )
            ).length ?? 0) / rowsPerPage
          )}
          page={page + 1}
          onChange={handleChangePage}
        />
        <SPlaceholder />
      </SBox>
    </ThemeProvider>
  );
};

export default EnhancedTable;

const SBox = styled(Box)``;
const PlayerTableCell = styled(TableCell)`
  text-align: -webkit-center;
`;
const ButtonsTableCell = styled(TableCell)`
  text-align: -webkit-center;
`;
const STableCell = styled(TableCell)`
  border: 0px;
  padding: 5px 10px 5px 10px;
`;
const SPlaceholder = styled.div`
  height: 150px;
  width: 100%;
`;
const SPagination = styled(Pagination)`
  width: 100%;
  ul {
    height: 50px;
    align-items: center;
    justify-content: center;
  }
`;
