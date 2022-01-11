import * as React from "react";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { palette } from "../../../styles/palette";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { useSongMultiple } from "../../hooks/useSongs";
import FilterOptions from "./components/FilterOptions";
import PlayerStickyDown from "../player/PlayerStickyDown";
import CardAddSong from "../cards/CardAddSong";
import CreateItem from "./components/CreateItem";
import CardEditSong from "../cards/CardEditSong";
import CardDeleteSong from "../cards/CardDeleteSong";

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
};

const handleSortBy = () => {};

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, rowCount, onSelectAllClick } = props;

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
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          color="white"
          id="tableTitle"
          component="div"
        >
          Songs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteRounded />
          </IconButton>
        </Tooltip>
      ) : (
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
        </div>
      )}
    </Toolbar>
  );
};

export const EnhancedTable: React.FC = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedPanel, setSelectedPanel] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showChild, setShowChild] = useState(false);
  const [playingName, setPlayingName] = useState("");
  const [sorterVisible, setSorterVisible] = useState(false);
  const [createSongVisible, setCreateSongVisible] = useState(false);
  const [editSongVisible, setEditSongVisible] = useState(false);
  const [editSongID, setEditSongID] = useState("");
  const [deleteSongVisible, setDeleteSongVisible] = useState(false);
  const [deleteSongID, setDeleteSongID] = useState("");

  const { songs } = useSongMultiple();
  const audioRef = useRef<HTMLAudioElement>(null);
  const sendPlayBtnRef = useRef<HTMLButtonElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showChild) setShowChild(true);
  }, []);

  useEffect(() => {
    const handleChangeSrc = (_src: string) => {
      if (audioRef.current !== null) {
        audioRef.current.src = _src;
        audioRef.current.play();
      }
    };
    if (sendPlayBtnRef.current !== null) {
      sendPlayBtnRef.current.addEventListener("click", () => {
        handleChangeSrc(sendPlayBtnRef.current!.value);
        setPlayingName(sendPlayBtnRef.current!.name ?? "");
      });
    }
    return () => {
      if (sendPlayBtnRef.current !== null) {
        sendPlayBtnRef.current.removeEventListener("click", () => {
          handleChangeSrc(sendPlayBtnRef.current!.value);
          setPlayingName(sendPlayBtnRef.current!.name ?? "");
        });
      }
    };
  });

  useEffect(() => {
    const handleChangeID = () => {
      if (editBtnRef.current !== null) {
        setEditSongID(editBtnRef.current.value);
        handleEditSong();
      }
    };

    if (editBtnRef.current !== null) {
      if(!editSongVisible)
      editBtnRef.current.addEventListener("click", () => handleChangeID());
      else
      editBtnRef.current.removeEventListener("click", () => handleChangeID());
    }
    return () => {
      if (editBtnRef.current !== null) {
        editBtnRef.current.removeEventListener("click", () => handleChangeID());
      }
    };
  });

  useEffect(() => {
    const handleDeleteID = () => {
      if (deleteBtnRef.current !== null) {
        setDeleteSongID(deleteBtnRef.current.value);
        handleDeleteSong();
      }
    };

    if (deleteBtnRef.current !== null) {
      if(!deleteSongVisible)
      deleteBtnRef.current.addEventListener("click", () => handleDeleteID());
      else
      deleteBtnRef.current.removeEventListener("click", () => handleDeleteID());
    }
    return () => {
      if (deleteBtnRef.current !== null) {
        deleteBtnRef.current.removeEventListener("click", () => handleDeleteID());
      }
    };
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isSelectedPanel = (name: string) => selectedPanel === name;

  const handleCreateSong = () => {
    setCreateSongVisible(!createSongVisible);
    setShowChild(!showChild);
  };

  const handleEditSong = () => {
    setEditSongVisible(!editSongVisible);
    setShowChild(!showChild);
  };

  const handleDeleteSong = () => {
    setDeleteSongVisible(!editSongVisible);
    setShowChild(!showChild);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (rows ? rows.length : 0))
      : 0;

  return (
    <ThemeProvider theme={palette}>
      <SBox sx={{ width: "100%", backgroundColor: "#2E3440" }}>
        {createSongVisible ? (
          <style jsx global>{`
            body {
              overflow: hidden;
            }
          `}</style>
        ) : (
          <style jsx global>{`
            body {
              overflow: auto;
            }
          `}</style>
        )}
        <EnhancedTableToolbar
          onSelectAllClick={handleSelectAllClick}
          rowCount={rows?.length ?? 0}
          isVisible={sorterVisible}
          setIsVisible={setSorterVisible}
          numSelected={selected.length}
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
            <Pagination
              sx={{ display: sorterVisible ? "table-header-group" : "none" }}
              count={Math.ceil((rows?.length ?? 0) / 10)}
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
                          btnRef={sendPlayBtnRef}
                          editBtnRef={editBtnRef}
                          deleteBtnRef={deleteBtnRef}
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
        <Placeholder />
      </SBox>
      {showChild ? (
        <PlayerStickyDown name={playingName} audioRef={audioRef} />
      ) : null}
      {createSongVisible ? (
        <CardAddSong setCreateSongVisible={handleCreateSong} />
      ) : null}
      {editSongVisible ? (
        <CardEditSong songID={editSongID} setEditSongVisible={handleEditSong} />
      ) : null}
      {deleteSongVisible ? (
        <CardDeleteSong songID={editSongID} setDeleteSongVisible={handleDeleteSong} />
      ) : null}
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
const Placeholder = styled.div`
  height: 150px;
  width: 100%;
`;
