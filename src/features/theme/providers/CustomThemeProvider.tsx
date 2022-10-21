import { createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectIsDarkMode } from "../themeSlice";

type Props = {
  children: React.ReactNode;
};

const commonTheme = {
  typography: {
    fontFamily: ["Nunito", "Kosugi_Maru", "Helvetica Neue", "sans-serif"].join(","),
    body1: {
      fontFamily: ["Noto_Sans", "Noto_Sans_JP", "Helvetica Neue", "sans-serif"].join(","),
    },
    body2: {
      fontFamily: ["Noto_Sans", "Noto_Sans_JP", "Helvetica Neue", "sans-serif"].join(","),
    },
  },
};

export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#cfcfcf",
    },
    secondary: {
      main: "#575757",
    },
    success: {
      main: "#772CE8",
    },
    background: {
      default: "#ececec",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#000000",
      secondary: "#404040",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f9f9f9",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#191919",
    },
    secondary: {
      main: "#bababa",
    },
    success: {
      main: "#772CE8",
    },
    background: {
      default: "#2d2d2d",
      paper: "#191919",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#191919",
        },
      },
    },
  },
});

const CustomThemeProvider: FC<Props> = ({ children }) => {
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
