import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks";
import { accessByInvitation } from "../room/roomSlice";

export const InvitationRedirectPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const asyncAccessByInvitation = async () => {
      const token = await getAccessTokenSilently();
      if (uuid === undefined) {
        // navigate("/");
        console.log("uuid is undefined");
      } else {
        await dispatch(accessByInvitation({ token, uuid }))
          .unwrap()
          .then((room) => {
            navigate(`/app/rooms/${room.id}`);
          })
          .catch(() => {
            console.log("access failed.");
          });
      }
    };

    asyncAccessByInvitation();
  });

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", overflow: "auto", bgcolor: "background.default" }}>
        <h1>redirect page here.</h1>
      </Box>
    </>
  );
};
