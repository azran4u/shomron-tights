import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const ink = "#2c241f";
const cocoa = "#7d4e3b";
const paper = "#fffcf9";
const canvas = "#f6f1eb";
const line = "#e7ddd4";
const muted = "#6f6158";

export const theme = createTheme({
  cssVariables: true,
  direction: "rtl",
  palette: {
    primary: {
      main: cocoa,
      contrastText: "#fffaf6",
    },
    secondary: {
      main: "#3f6f66",
    },
    error: {
      main: "#b42318",
    },
    info: {
      main: cocoa,
    },
    background: {
      default: canvas,
      paper,
    },
    text: {
      primary: ink,
      secondary: muted,
    },
    divider: line,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Heebo', 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Frank Ruhl Libre', 'Heebo', serif",
      fontWeight: 500,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: "'Frank Ruhl Libre', 'Heebo', serif",
      fontWeight: 500,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: "'Frank Ruhl Libre', 'Heebo', serif",
      fontWeight: 500,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: "'Frank Ruhl Libre', 'Heebo', serif",
      fontWeight: 500,
      letterSpacing: 0,
      fontSize: "2rem",
    },
    h5: { fontWeight: 600, letterSpacing: 0 },
    h6: { fontWeight: 600, letterSpacing: 0 },
    button: { fontWeight: 600, letterSpacing: 0 },
    subtitle1: { lineHeight: 1.6 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: canvas,
          color: ink,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          boxShadow: "none",
        },
        sizeSmall: {
          minHeight: 34,
          paddingInline: "0.9rem",
        },
        sizeMedium: {
          minHeight: 42,
          paddingInline: "1.25rem",
        },
        sizeLarge: {
          minHeight: 48,
          paddingInline: "1.5rem",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "inherit",
      },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 252, 249, 0.92)",
          color: ink,
          borderBottom: `1px solid ${line}`,
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${line}`,
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#fff",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: muted,
          fontWeight: 600,
          marginBottom: 6,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: muted,
          borderBottom: `1px solid ${line}`,
        },
        root: {
          borderColor: line,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
