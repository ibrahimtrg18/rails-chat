export const LOCAL_STORAGE_KEYS = {
  TOKEN: "TOKEN",
};

export const getLocalStorage = (key) => {
  if (typeof window === "undefined") {
    return;
  }

  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  return localStorage.setItem(key, value);
};

export const removeLocalStorage = (key) => {
  if (typeof window === "undefined") {
    return;
  }

  return localStorage.removeItem(key);
};
