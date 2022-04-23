import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.TwoColPaperMenu": {
            width: "600px",
            height: "300px",
            position: "relative",
            overflowY: "hidden",
            backgroundColor: "#fffffe",
            boxShadow: "unset",
          },
          "&.PaperMenu": {
            width: "300px",
            height: "300px",
            position: "relative",
            overflowY: "hidden",
            backgroundColor: "#fffffe",
            boxShadow: "unset",
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
          "&.TwoColPaperChild": {
            width: "300px",
            height: "300px",
            position: "absolute",
            top: 0,
            left: 300,
            overflowY: "auto",
            boxShadow: "unset",
            backgroundColor: "#fffffe",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "&.ListMenuNoPadding": {
            padding: "0px",
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
          "&.MenuTitleClose": {
            position: 'absolute',
            top: '50%',
            right: '16px',
            transform: 'translateY(-50%)'
          },
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
          "&.TwoColMenuItemChild": {
            padding: "6px 16px 6px 48px",
          },
          "&.MenuItemChild": {
            padding: "6px 16px 6px 80px",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  },
});

export default theme;
