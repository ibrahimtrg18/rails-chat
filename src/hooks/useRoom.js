import React, { useEffect } from "react";
import { axios } from "../libs/axios";
import { cable } from "../libs/cable";
import { useAuthContext } from "../contexts/AuthContext";

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
      const messages = [...state.messages, action.payload];

      return {
        ...state,
        messages,
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
  const { token } = useAuthContext();

  const initRooms = (rooms = []) => {
    return dispatch({ type: ROOM_ACTIONS.INITIAL_ROOMS, payload: rooms });
  };

  const initMessages = (messages = []) => {
    return dispatch({
      type: ROOM_ACTIONS.INITIAL_ROOM_MESSAGES,
      payload: messages,
    });
  };

  const addMessage = (message) => {
    return dispatch({ type: ROOM_ACTIONS.ADD_MESSAGE, payload: message });
  };

  useEffect(() => {
    cable.subscriptions.create(
      {
        channel: "ChatChannel",
        room_id: roomId,
        token,
      },
      {
        connected: () => {
          console.log("Connected to ChatChannel");
        },
        disconnected: () => {
          console.log("Disconnected from ChatChannel");
        },
        received(data) {
          // Handle incoming messages
          addMessage(data);
        },
      }
    );
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/v1/rooms`);

      initRooms(response.data);
    })();
  }, []);

  useEffect(() => {
    if (roomId) {
      (async () => {
        const response = await axios.get(`/api/v1/rooms/${roomId}/messages`);

        initMessages(response.data);
      })();
    }
  }, [roomId]);

  return {
    // state
    rooms,
    messages,

    // dispatcher
    initRooms,
    initMessages,
    addMessage,
  };
};
