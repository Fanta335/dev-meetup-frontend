import { Button, createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../stores/store";
import Auth0ProviderWithHistory from "../features/auth/providers/auth0-provider-with-history";

const ErrorFallback = () => {
  return (
    <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

const theme = createTheme({
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

type Props = {
  children: React.ReactNode;
};

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </Provider>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
