import { Button } from '@mui/material';
import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../stores/store';
import Auth0ProviderWithHistory from '../features/auth/providers/auth0-provider-with-history';
import CustomThemeProvider from '../features/theme/providers/CustomThemeProvider';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => {
          return window.location.assign(window.location.origin);
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Provider store={store}>
            <CustomThemeProvider>{children}</CustomThemeProvider>
          </Provider>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
