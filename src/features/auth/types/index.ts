import { User } from "@auth0/auth0-react";

const namespace = process.env.REACT_APP_API_NAMESPACE;
export const mysqlUser = Symbol(namespace + "/mysqlUser");
export const roles = Symbol(namespace + "/roles");

export type Auth0User = {
  [mysqlUser]: MysqlUser;
  [roles]: string;
} & User;

export type MysqlUser = {
  id: number;
  name: string;
  email: string;
  subId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
