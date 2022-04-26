import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { messageActions } from "./messageSlice";
import { Message, MessageEvent } from "./types";

export const messageMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().message.isConnected;

    // Establish socket connection to API.
    if (messageActions.startConnecting.match(action)) {
      const { token } = action.payload;

      socket = io(process.env.REACT_APP_API_URL, {
        auth: {
          token: token,
        },
      });

      // After connection established, listen to messages from server.
      socket.on("connect", () => {
        store.dispatch(messageActions.connectionEstablished());

        socket.on(MessageEvent.ReceiveMessage, (message: Message) => {
          store.dispatch(messageActions.receiveMessage(message));
        });

        socket.on(MessageEvent.ReceiveMessageRemoved, (message: Message) => {
          store.dispatch(messageActions.receiveMessageRemoved(message));
        });
      });
    }

    // Handle room joining & sending message.
    if (isConnectionEstablished) {
      if (messageActions.joinRoom.match(action)) {
        const roomId = action.payload.roomId;
        socket.emit(MessageEvent.JoinRoom, { roomId });
        socket.on("joined_room", (data) => console.log("room id you joined is: ", data));
      }

      if (messageActions.leaveRoom.match(action)) {
        const roomId = action.payload.roomId;
        socket.emit(MessageEvent.LeaveRoom, { roomId });
        socket.on("left_room", (data) => console.log("left from: ", data));
      }

      if (messageActions.sendMessage.match(action)) {
        socket.emit(MessageEvent.SendMessage, action.payload);
      }

      if (messageActions.updateMessage.match(action)) {
        socket.emit(MessageEvent.UpdateMessage, action.payload);
      }

      if (messageActions.removeMessage.match(action)) {
        socket.emit(MessageEvent.RemoveMessage, action.payload);
      }
    }

    next(action);
  };
};
