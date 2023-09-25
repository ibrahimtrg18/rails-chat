import React from "react";
import { RoomList } from "./Fragments/RoomList";
import { RoomContextProvider } from "../../contexts/RoomContext";

const RoomPage = () => {
  return (
    <RoomContextProvider>
      <RoomList />
    </RoomContextProvider>
  );
};

export default RoomPage;
