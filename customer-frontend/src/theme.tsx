import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// A custom theme for this app
export const theme = createTheme({
  cssVariables: true,
  direction: "rtl",
  palette: {
    primary: {
      main: "#ab7a5f",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#e84242",
    },
  },
  typography: {
    fontFamily: "Alef",
    // fontFamily: "sans-serif",
    // fontFamily: "Arimo",
    // fontFamily: "Assistant",
    // fontFamily: "Rubik",
    // fontFamily: "Open Sans",
    // fontFamily: "Arial",
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
