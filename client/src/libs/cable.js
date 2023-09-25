import * as ActionCable from "@rails/actioncable";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export const cable = ActionCable.createConsumer(`${SOCKET_URL}/cable`);
