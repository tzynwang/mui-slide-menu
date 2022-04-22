import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.PaperMenu": {
            width: "300px",
            height: "300px",
            position: "relative",
            overflowY: "hidden",
            backgroundColor: "#fffffe",
          },
          "&.PaperParent, &.PaperChild": {
            width: "300px",
            height: "300px",
            position: "absolute",
            top: 0,
            left: 0,
            overflowY: "auto",
            boxShadow: "unset",
          },
          "&.PaperParent": {
            backgroundColor: "#fffffe",
          },
          "&.PaperChild": {
            backgroundColor: "#fffffe",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.SvgIconParent": {
            marginLeft: "auto",
            fontSize: "1rem",
          },
          "&.SvgIconChild": {
            fontSize: "1rem",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.ButtonBaseParent": {
            marginLeft: "auto",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Height40": {
            height: "40px",
          },
          "&.MenuItemChild": {
            padding: "6px 16px 6px 80px",
          },
        },
      },
    },
  },
});

export default theme;
