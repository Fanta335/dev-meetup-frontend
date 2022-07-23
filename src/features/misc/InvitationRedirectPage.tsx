import { useAuth0 } from "@auth0/auth0-react";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks";
import { accessByInvitation } from "../room/roomSlice";
import { InvalidInvitation } from "./components/InvalidInvitation";

export const InvitationRedirectPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [passed, setPassed] = useState<boolean | null>(null);

  useEffect(() => {
    const asyncAccessByInvitation = async () => {
      const token = await getAccessTokenSilently();
      if (uuid === undefined) {
        navigate("/");
        console.log("uuid is undefined");
      } else {
        await dispatch(accessByInvitation({ token, uuid }))
          .unwrap()
          .then((room) => {
            setPassed(true);
            navigate(`/app/rooms/${room.id}`);
          })
          .catch(() => {
            setPassed(false);
            console.log("access failed.");
          });
      }
    };

    asyncAccessByInvitation();
  });

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", overflow: "auto", bgcolor: "background.default" }}>
        {passed === false && (
          <Grid item>
            <InvalidInvitation />
          </Grid>
        )}
      </Grid>
    </>
  );
};
