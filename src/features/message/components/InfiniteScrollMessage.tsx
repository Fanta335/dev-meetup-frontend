import { Virtuoso } from "react-virtuoso";
import { useState, useCallback } from "react";

type DummyMessage = {
  id: number;
  content: string;
};

const generateMessages = (usersToPrepend: number, nextFirstItemIndex: number) => {
  const messages: DummyMessage[] = [];
  for (let i = 0; i < usersToPrepend; i++) {
    const id = i + nextFirstItemIndex;
    const content = "Content: " + Math.random().toString();
    messages.push({ id, content });
  }
  return messages;
};

export const InfiniteScrollMessage = () => {
  const START_INDEX = 10000;
  const INITIAL_ITEM_COUNT = 50;
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
  const [messages, setMessages] = useState<DummyMessage[]>(() => generateMessages(INITIAL_ITEM_COUNT, START_INDEX));

  const prependItems = useCallback(() => {
    const usersToPrepend = 20;
    const nextFirstItemIndex = firstItemIndex - usersToPrepend;

    setTimeout(() => {
      setFirstItemIndex(() => nextFirstItemIndex);
      setMessages(() => [...generateMessages(usersToPrepend, nextFirstItemIndex), ...messages]);
    }, 500);

    return false;
  }, [firstItemIndex, messages, setMessages]);

  return (
    <Virtuoso
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
      data={messages}
      startReached={prependItems}
      itemContent={(index, message) => {
        return (
          <div style={{ backgroundColor: "gray" }}>
            {message.id}. {message.content}
          </div>
        );
      }}
      components={{ Header }}
    />
  );
};

const Header = () => {
  return (
    <div
      style={{
        padding: "6rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
};
