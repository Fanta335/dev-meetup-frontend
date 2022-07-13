import { Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { VFC } from "react";

type Props = {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export const ShowRoomMemberDrawerButton: VFC<Props> = ({ toggleDrawer }) => {
  return (
    <Button onClick={toggleDrawer(true)} sx={{ position: "fixed", right: "10px", top: "80px" }} startIcon={<PeopleIcon />} variant="contained">
      メンバー
    </Button>
  );
};
