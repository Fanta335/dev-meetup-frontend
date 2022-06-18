import { withAuthenticationRequired } from "@auth0/auth0-react";
import { VFC } from "react";
import { Loading } from "../components/Loading";

type Props = {
  component: React.VFC;
};

export const RouteGuard: VFC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, { onRedirecting: () => <Loading /> });
  return <Component />;
};
