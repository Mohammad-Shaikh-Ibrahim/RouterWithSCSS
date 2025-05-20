import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#b92031",
      light: "#e84d5c",
      dark: "#8b0019",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "rgba(244, 67, 54, 0.085)",
      light: "rgba(244, 67, 54, 0.15)",
      dark: "rgba(244, 67, 54, 0.05)",
      contrastText: "#b92031",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1d3557",
      secondary: "#457b9d",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      color: "#1d3557",
    },
    h2: {
      color: "#1d3557",
    },
    h3: {
      color: "#1d3557",
    },
    h4: {
      color: "#1d3557",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
