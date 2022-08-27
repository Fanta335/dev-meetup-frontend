import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useState, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchManyMessages, fetchMoreMessages, selectCurrentMessages, selectHasPrevMessages } from "../messageSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { selectCurrentRoom } from "../../room/roomSlice";
import { MessageItem } from "./MessageItem";
import { WelcomeMessage } from "./WelcomeMessage";
import { Loading } from "../../../components/Loading";
import { Grid } from "@mui/material";

export const InfiniteScrollMessage = () => {
  const currentMessages = useAppSelector(selectCurrentMessages);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const hasPrev = useAppSelector(selectHasPrevMessages);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const virtuoso = useRef<VirtuosoHandle>(null);

  const START_INDEX = 10000;
  const INITIAL_ITEM_COUNT = 10;
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);

  const prependMessages = useCallback(async () => {
    if (hasPrev) {
      const token = await getAccessTokenSilently();
      const sinceId = currentMessages.allIds[0];
      const searchParams = `since-id=${sinceId}&limit=10`;

      const nextFirstItemIndex = firstItemIndex - 10;
      setFirstItemIndex(() => nextFirstItemIndex);

      await dispatch(fetchMoreMessages({ token, roomId: currentRoom.entity.id.toString(), searchParams }));
    }
  }, [currentMessages, currentRoom.entity.id, dispatch, getAccessTokenSilently, firstItemIndex, hasPrev]);

  const handleClickReply = useCallback(
    async (virtualListIndex: number | undefined, messageId: number) => {
      if (virtualListIndex) {
        console.log("first index ", firstItemIndex);
        console.log("v list index ", virtualListIndex);
        virtuoso.current?.scrollToIndex({
          index: virtualListIndex - firstItemIndex,
          align: "center",
          behavior: "smooth",
        });
      } else {
        const searchParams = `since-id=${messageId + 5}&limit=30`;
        const token = await getAccessTokenSilently();
        await dispatch(fetchManyMessages({ token, roomId: currentRoom.entity.id.toString(), searchParams }));
      }
    },
    [firstItemIndex, currentRoom.entity.id, dispatch, getAccessTokenSilently]
  );

  return (
    <Virtuoso
      style={{ marginTop: "60px" }}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
      data={currentMessages.allIds}
      ref={virtuoso}
      startReached={prependMessages}
      followOutput={"auto"}
      itemContent={(index, messageId) => {
        return <MessageItem key={messageId} messageId={messageId} virtualListId={index} handleClickReply={handleClickReply} />;
      }}
      components={{ Header }}
    />
  );
};

const Header = () => {
  const hasPrev = useAppSelector(selectHasPrevMessages);

  return (
    <>
      {hasPrev ? (
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
