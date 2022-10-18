import { createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectColorMode } from "../themeSlice";

type Props = {
  children: React.ReactNode;
};

export const lightTheme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Kosugi_Maru", "sans-serif"].join(","),
    body1: {
      fontFamily: ["Helvetica Neue", "sans-serif"].join(","),
    },
    body2: {
      fontFamily: ["Helvetica Neue", "sans-serif"].join(","),
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#cfcfcf",
    },
    secondary: {
      main: "#bababa",
    },
    success: {
      main: "#772CE8",
    },
    background: {
      default: "#fbfbfb",
      paper: "#838383",
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
          backgroundColor: "#eaeaea",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Kosugi_Maru", "sans-serif"].join(","),
    body1: {
      fontFamily: ["Helvetica Neue", "sans-serif"].join(","),
    },
    body2: {
      fontFamily: ["Helvetica Neue", "sans-serif"].join(","),
    },
  },
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
  const colorMode = useAppSelector(selectColorMode);

  return <ThemeProvider theme={colorMode === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
