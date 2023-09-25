import React from "react";
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorage,
  setLocalStorage,
} from "../utils/localstorage";

export const AUTH_ACTIONS = {
  SET_TOKEN: "SET_TOKEN",
  INITIAL: "INITIAL",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.INITIAL:
      return {
        ...state,
        ...action.payload,
      };

    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };

    default:
      return state;
  }
};

export const useAuth = () => {
  const [{ token, user, isLoggedIn }, dispatch] = React.useReducer(
    authReducer,
    {
      isLoggedIn: false,
      user: {},
      token: "",
    }
  );

  const initialAuthValues = (payload) => {
    setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, payload.token);

    dispatch({ type: AUTH_ACTIONS.INITIAL, payload: payload });
  };

  const setToken = (token) => {
    dispatch({ type: AUTH_ACTIONS.SET_TOKEN, payload: token });
  };

  React.useEffect(() => {
    const token = getLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);

    if (token) {
      setToken(token);
    }
  }, []);

  return {
    // state
    token,
    isLoggedIn,
    user,

    // dispatcher
    initialAuthValues,
    setToken,
  };
};
