import { Virtuoso } from "react-virtuoso";
import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchMoreMessages, selectCurrentMessages, selectHasNextMessages } from "../messageSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { selectCurrentRoom } from "../../room/roomSlice";

export const InfiniteScrollMessage2 = () => {
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
      const searchParams = `since-id=${sinceId}&limit=5`;

      const nextFirstItemIndex = firstItemIndex - 5;
      setFirstItemIndex(() => nextFirstItemIndex);

      await dispatch(fetchMoreMessages({ token, roomId: currentRoom.entity.id.toString(), searchParams }));
    }
  }, [currentMessages, currentRoom.entity.id, dispatch, getAccessTokenSilently, firstItemIndex, hasNext]);

  return (
    <Virtuoso
      style={{ height: 700, marginTop: "70px" }}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={INITIAL_ITEM_COUNT}
      data={currentMessages.allIds}
      startReached={prependMessages}
      followOutput={"auto"}
      itemContent={(index, messageId) => {
        return (
          <>
            {/* <Box sx={{ mt: "70px" }}>
              <MessageItem key={messageId} messageId={messageId} />
            </Box> */}
            <div style={{ backgroundColor: "gray", height: "150px" }}>{messageId}</div>
          </>
        );
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
        <div
          style={{
            padding: "6rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          style={{
            padding: "6rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          No more messages.
        </div>
        // <WelcomeMessage />
      )}
    </>
  );
};
