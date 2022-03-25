import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, VFC } from "react";
import { MysqlUser } from "../types";

const Profile: VFC = () => {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [mysqlUser, setMysqlUser] = useState<MysqlUser>();
  const namespace = process.env.REACT_APP_METADATA_NAMESPACE || "https://dev-meetup-backend.com/mysqlUser";

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const claims = await getIdTokenClaims();
        if (claims !== undefined) {
          const userData: MysqlUser = claims[namespace + "/mysqlUser"];
          setMysqlUser(userData);
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getIdTokenClaims, namespace]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <h3>User Metadata</h3>
      {mysqlUser ? <pre>{JSON.stringify(mysqlUser, null, 2)}</pre> : "No user metadata defined"}
      {mysqlUser ? <h4>Id: {mysqlUser.id}</h4> : "no user meta"}
      {mysqlUser ? <h4>Name: {mysqlUser.name}</h4> : "no user meta"}
      {mysqlUser ? <h4>email: {mysqlUser.email}</h4> : "no user meta"}
      {mysqlUser ? <h4>sub id: {mysqlUser.subId}</h4> : "no user meta"}
      {mysqlUser ? <h4>createdAt: {mysqlUser.createdAt}</h4> : "no user meta"}
      {mysqlUser ? <h4>updatedAt: {mysqlUser.updatedAt}</h4> : "no user meta"}
    </div>
  ) : (
    <h2>Not authenticated!</h2>
  );
};

export default Profile;
