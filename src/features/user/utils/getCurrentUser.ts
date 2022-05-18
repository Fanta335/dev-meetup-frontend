import { Auth0User } from "../../auth/types";
import { CurrentUser } from "../types";

export const getCurrentUser = (user: Auth0User | undefined) => {
  if (!user) return undefined;

  const claim = process.env.REACT_APP_API_NAMESPACE + "/mysqlUser";
  const currentUser: CurrentUser = user[claim];

  return currentUser;
};
