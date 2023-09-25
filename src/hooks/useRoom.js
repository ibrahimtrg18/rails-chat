import React from "react";

export const ROOM_ACTIONS = {
  INITIAL_ROOMS: "INITIAL_ROOMS",
  INITIAL_ROOM: "INITIAL_ROOM",
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

    case ROOM_ACTIONS.INITIAL_ROOM:
      return {
        ...state,
        room: action.payload,
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

export const useRoom = () => {
  const [{ room, rooms, messages }, dispatch] = React.useReducer(roomReducer, {
    room: {},
    rooms: [],
    messages: [],
  });

  const initRooms = (rooms = []) => {
    return dispatch({ type: ROOM_ACTIONS.INITIAL_ROOMS, payload: rooms });
  };

  const initRoom = (room = {}) => {
    return dispatch({ type: ROOM_ACTIONS.INITIAL_ROOM, payload: room });
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

  return {
    // state
    room,
    rooms,
    messages,

    // dispatcher
    initRooms,
    initRoom,
    initMessages,
    addMessage,
  };
};
