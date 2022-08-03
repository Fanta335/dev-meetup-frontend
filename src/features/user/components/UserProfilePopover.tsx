import { Popover, Typography } from "@mui/material";
import { VFC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";
import { User } from "../types";
import { AddOwnerPopover } from "./AddOwnerPopover";
import { UserProfilePopoverContent } from "./UserProfilePopoverContent";

type Props = {
  user: User;
  open: boolean;
  anchorEl: (EventTarget & Element) | null;
  handleClose: () => void;
};

export const UserProfilePopover: VFC<Props> = ({ user, open, anchorEl, handleClose }) => {
  const id = open ? "simple-popover" : undefined;
  const currentRoom = useAppSelector(selectCurrentRoom);
  const isOwner = currentRoom.entity.owners.includes(user.id);

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { width: "300px" } }}
      >
        <UserProfilePopoverContent user={user} />
        {isOwner ? <Typography>this is owner.</Typography> : <AddOwnerPopover user={user} />}
      </Popover>
    </>
  );
};
