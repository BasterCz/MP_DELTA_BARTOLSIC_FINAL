import { createTheme } from "@mui/material/styles";

export const palette = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#81A1C1",
    },
    secondary: {
      main: "#EBCB8B",
    },
    background: {
      default: "#3B4252",
      paper: "#2E3440",
    },
    error: {
      main: "#BF616A",
    },
    success: {
      main: "#A3BE8C"
    }
  },
});
