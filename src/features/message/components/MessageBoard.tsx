import { Button } from "@mui/material";
import { io } from "socket.io-client";

export const MessageBoard = () => {
  const socket = io("http://localhost:3000");
  socket.on("connect", () => {
    console.log("Connected!");

    socket.emit("send_message", { test: "test" });
  });
  socket.on("send_message", (data) => {
    console.log("message", data);
  });
  socket.on("recieve_message", (data) => {
    console.log("message", data);
  });
  socket.on("exception", function (data) {
    console.log("event", data);
  });
  socket.on("disconnect", function () {
    console.log("Disconnected");
  });

  const handleClick = () => {
    socket.emit("click", { message: "clicked!!" });
  };

  return (
    <>
      <Button onClick={handleClick}>send message</Button>
    </>
  );
};
