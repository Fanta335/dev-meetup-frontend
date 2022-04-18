import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithHistory: FC = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const navigate = useNavigate();
  const target = window.location.origin + "/app";

  const onRedirectCallback = (appState: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={target}
      onRedirectCallback={onRedirectCallback}
      audience={audience} // react appがアクセスするresource url
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
