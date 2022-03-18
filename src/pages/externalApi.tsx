import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useState, VFC } from "react";

const ExternalApi: VFC = () => {
  const [users, setUsers] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/users`);

      const responseData = await response.json();
      console.log(responseData);

      setUsers(responseData.user);
    } catch (e) {
      setUsers(e.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${serverUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      console.log(responseData);

      setUsers(JSON.stringify(responseData));
    } catch (e) {
      setUsers(e.message);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={callApi}>
        Get public data
      </Button>
      <Button variant="contained" onClick={callSecureApi}>
        Get protected data
      </Button>
      <div>{users && <code>{users}</code>}</div>
    </div>
  );
};

export default ExternalApi;
