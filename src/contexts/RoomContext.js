import React, { useContext } from "react";
import { useRoom } from "../hooks/useRoom";

export const RoomContext = React.createContext();

export const RoomContextProvider = ({ children, roomId }) => {
  const value = useRoom(roomId);
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoomContext must be used within a RoomContextProvider");
  }

  return context;
};
