import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { Auth0User } from "../auth/types";
import { changeLocation } from "../room/roomSlice";
import { UploadAndDisplayImage } from "./components/UploadAndDisplayImage";

export const Home = () => {
  const { user } = useAuth0<Auth0User>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeLocation("home"));
  }, [dispatch]);

  return (
    <div>
      <h1>home page.</h1>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <UploadAndDisplayImage />
    </div>
  );
};
