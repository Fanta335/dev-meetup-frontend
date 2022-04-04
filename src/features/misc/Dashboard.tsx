import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchAsyncGetUsers, selectUsers } from "../users/userSlice";

export const Dashboard = () => {
  const { user } = useAuth0();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    const fetchUsersData = async () => {
      await dispatch(fetchAsyncGetUsers());
    };
    fetchUsersData();
  }, [dispatch]);

  console.log("users: ", users);
  return (
    <div>
      <h1>Dashboard page.</h1>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};
