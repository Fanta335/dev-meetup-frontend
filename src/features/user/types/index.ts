export type UserType = {
  currentUser: User;
  currentUsers: CurrentUsers;
};

export type User = {
  id: number;
  subId?: string;
  name: string;
  email?: string;
  description: string;
  avatar: Avatar;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type Avatar = {
  id: number;
  key: string;
  url: string;
};

export type CurrentUsers = {
  members: {
    byIds: {
      [key: string]: User;
    };
    allIds: number[];
  };
  // In order to avoid duplication of users, owners are managed with only id.
  owners: number[];
};

export type CurrentUser = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type UpdateUserDTO = {
  description?: string;
};

export type UpdateRootUserDTO = {
  name?: string;
  email?: string;
  password?: string;
};
