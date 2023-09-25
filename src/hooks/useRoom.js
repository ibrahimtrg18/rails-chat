import React from "react";
import { axios } from "../libs/axios";

export const ROOM_ACTIONS = {
  INITIAL_ROOMS: "INITIAL_ROOMS",
  INITIAL_ROOM_MESSAGES: "INITIAL_ROOM_MESSAGES",
  ADD_MESSAGE: "ADD_MESSAGE",
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case ROOM_ACTIONS.INITIAL_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };

    case ROOM_ACTIONS.INITIAL_ROOM_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case ROOM_ACTIONS.ADD_MESSAGE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const useRoom = (roomId) => {
  const [{ rooms, messages }, dispatch] = React.useReducer(roomReducer, {
    rooms: [],
    messages: [],
  });

  const initRooms = (rooms = []) => {
    return dispatch({ type: ROOM_ACTIONS.INITIAL_ROOMS, payload: rooms });
  };

  const initMessages = (messages = []) => {
    return dispatch({
      type: ROOM_ACTIONS.INITIAL_ROOM_MESSAGES,
      payload: messages,
    });
  };

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/v1/rooms`);

      initRooms(response.data);
    })();
  }, []);

  React.useEffect(() => {
    if (roomId) {
      (async () => {
        const response = await axios.get(`/api/v1/rooms/${roomId}/messages`);

        initMessages(response.data);
      })();
    }
  }, [roomId]);

  console.log("messages", messages);
  return {
    // state
    rooms,
    messages,

    // dispatcher
    initRooms,
    initMessages,
  };
};
