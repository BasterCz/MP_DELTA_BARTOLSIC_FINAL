import { createTheme } from "@mui/material/styles";

export const palette = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#ff817f",
    },
    background: {
      default: "#0a1929",
      paper: "#001e3c",
    },
    error: {
      main: "#ff2919",
    },
  },
});
