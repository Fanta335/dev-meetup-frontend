export type UserMetaData = {
  mysqlUser: MysqlUser;
};

export type MysqlUser = {
  id: number;
  name: string;
  email: string;
  subId: string;
  createdAt: string;
  updatedAt: string;
}
