import React from "react";
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorage,
  setLocalStorage,
} from "../utils/localstorage";

export const AUTH_ACTIONS = {
  SET_TOKEN: "SET_TOKEN",
};

const authReducer = (state, action) => {
  switch (action.type) {
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
  const [{ token, isLoggedIn }, dispatch] = React.useReducer(authReducer, {
    isLoggedIn: false,
    token: "",
  });

  const initializeToken = (token) => {
    setLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, token);
  };

  const setToken = (token) => {
    return dispatch({ type: AUTH_ACTIONS.SET_TOKEN, payload: token });
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

    // dispatcher
    initializeToken,
    setToken,
  };
};
