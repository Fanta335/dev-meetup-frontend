import { Virtuoso } from "react-virtuoso";
import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchMoreMessages, selectCurrentMessages, selectHasNextMessages } from "../messageSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { selectCurrentRoom } from "../../room/roomSlice";
import { MessageItem } from "./MessageItem";
import { WelcomeMessage } from "./WelcomeMessage";
import { Loading } from "../../../components/Loading";
import { Grid } from "@mui/material";

export const InfiniteScrollMessage = () => {
  const currentMessages = useAppSelector(selectCurrentMessages);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const hasNext = useAppSelector(selectHasNextMessages);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const START_INDEX = 10000;
  const INITIAL_ITEM_COUNT = 10;
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);

  const prependMessages = useCallback(async () => {
    if (hasNext) {
      const token = await getAccessTokenSilently();
      const sinceId = currentMessages.allIds[0];
      const searchParams = `since-id=${sinceId}&limit=10`;

      const nextFirstItemIndex = firstItemIndex - 10;
      setFirstItemIndex(() => nextFirstItemIndex);

      await dispatch(fetchMoreMessages({ token, roomId: currentRoom.entity.id.toString(), searchParams }));
    }
  }, [currentMessages, currentRoom.entity.id, dispatch, getAccessTokenSilently, firstItemIndex, hasNext]);

  return (
    <Virtuoso
      style={{ marginTop: "60px" }}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={INITIAL_ITEM_COUNT}
      data={currentMessages.allIds}
      startReached={prependMessages}
      followOutput={"auto"}
      itemContent={(index, messageId) => {
        return <MessageItem key={messageId} messageId={messageId} />;
      }}
      components={{ Header }}
    />
  );
};

const Header = () => {
  const hasNext = useAppSelector(selectHasNextMessages);

  return (
    <>
      {hasNext ? (
        <Grid container justifyContent="center">
          <Grid item>
            <Loading />
          </Grid>
        </Grid>
      ) : (
        <WelcomeMessage />
      )}
    </>
  );
};
