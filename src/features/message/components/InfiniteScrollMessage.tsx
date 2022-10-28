import { ListRange, Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useCallback, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAllMessageIds, fetchMoreMessages, selectCurrentMessages, selectMessageListMap } from "../messageSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { selectCurrentRoom } from "../../room/roomSlice";
import { MessageItem } from "./MessageItem";
import { WelcomeMessage } from "./WelcomeMessage";

export const InfiniteScrollMessage = () => {
  const currentMessages = useAppSelector(selectCurrentMessages);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const messageListMap = useAppSelector(selectMessageListMap);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const virtuoso = useRef<VirtuosoHandle>(null);

  const loadMessages = useCallback(
    async (messageId: number, isLater: boolean) => {
      const token = await getAccessTokenSilently();
      const date = isLater ? 1 : -1;
      const searchParams = `since-id=${messageId}&date=${date}&limit=30`;

      await dispatch(fetchMoreMessages({ token, roomId: currentRoom.entity.id.toString(), searchParams }));
    },
    [currentRoom.entity.id, dispatch, getAccessTokenSilently]
  );

  const handleRangeChanged = useCallback(
    (range: ListRange) => {
      const startMessageId = currentMessages.allIds[range.startIndex];
      const endMessageId = currentMessages.allIds[range.endIndex];
      if (!currentMessages.byIds[startMessageId]) {
        loadMessages(startMessageId, true);
      } else if (!currentMessages.byIds[endMessageId]) {
        loadMessages(endMessageId, false);
      }
    },
    [currentMessages.allIds, currentMessages.byIds, loadMessages]
  );

  const handleClickReply = useCallback(
    async (messageId: number) => {
      virtuoso.current?.scrollToIndex({
        index: messageListMap[messageId],
        align: "center",
        behavior: "smooth",
      });
    },
    [messageListMap]
  );

  useEffect(() => {
    const asyncFetchAllMessageIds = async () => {
      const token = await getAccessTokenSilently();
      dispatch(fetchAllMessageIds({ token, roomId: currentRoom.entity.id.toString() }));
    };
    asyncFetchAllMessageIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Virtuoso
        initialTopMostItemIndex={100000}
        style={{ marginTop: "60px" }}
        data={currentMessages.allIds}
        ref={virtuoso}
        rangeChanged={(range) => handleRangeChanged(range)}
        followOutput={"auto"}
        itemContent={(index, messageId) => {
          return <MessageItem key={messageId} messageId={messageId} virtualListId={index} handleClickReply={handleClickReply} />;
        }}
        components={{ Header }}
      />
    </>
  );
};

const Header = () => {
  return <WelcomeMessage />;
};
