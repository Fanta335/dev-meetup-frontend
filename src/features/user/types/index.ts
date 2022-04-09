export type User = {
  id: number;
  subId?: string;
  name: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type CurrentUsers = {
  members: {
    byIds: {
      [key: string]: User;
    };
    allIds: string[];
  };
  // In order to avoid duplication of users, owners are managed with only id.
  owners: string[];
};
