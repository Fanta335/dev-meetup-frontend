import { withAuthenticationRequired } from "@auth0/auth0-react";
import { VFC } from "react";

type Props = {
  component: React.VFC;
};

export const RouteGuard: VFC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component);
  return <Component />;
};
