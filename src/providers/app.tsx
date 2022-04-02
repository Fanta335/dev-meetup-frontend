import { Button } from "@mui/material";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import Auth0ProviderWithHistory from "../features/auth/components/auth0-provider-with-history";

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

export const AppProvider: FC = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Provider store={store}>{children}</Provider>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
