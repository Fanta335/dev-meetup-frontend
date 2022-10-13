import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FC } from "react";
import { Loading } from "../components/Loading";

type Props = {
  component: React.FC;
};

export const RouteGuard: FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, { onRedirecting: () => <Loading /> });
  return <Component />;
};
