import { IdToken, useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
import { useEffect, useState, VFC } from "react";
import { Loading } from "./Loading";
import { MysqlUser } from "../types";

const Profile: VFC = () => {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [mysqlUser, setMysqlUser] = useState<MysqlUser>();
  // const [responseData, setResponseData] = useState<any>();
  // const serverUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  useEffect(() => {
    // const getUserData = async () => {
    //   try {
    //     const token = await getAccessTokenSilently();
    //     console.log(token);
    //     console.log(user?.sub);

    //     const response = await axios(`${serverUrl}/users/`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     const responseData = response.data;
    //     console.log(response.data);
    //     setResponseData(responseData);
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // };

    const getUserMetaData = async () => {
      try {
        const claims = await getIdTokenClaims() as IdToken;
        const namespace = process.env.REACT_APP_API_NAMESPACE;
        const userMetaData = claims[namespace + '/mysqlUser'];
        console.log(userMetaData);
        setMysqlUser(userMetaData);
      } catch (e) {
        console.log(e);
      }
    };

    getUserMetaData();
  }, [getIdTokenClaims]);

  if (isLoading) {
    return <Loading />;
  }

  console.log('this is profile.');

  return isAuthenticated ? (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <h3>MySQL User Data</h3>
      {mysqlUser ? <pre>{JSON.stringify(mysqlUser, null, 2)}</pre> : "No user data. "}
    </div>
  ) : (
    <h2>Not authenticated!</h2>
  );
};

export default Profile;
