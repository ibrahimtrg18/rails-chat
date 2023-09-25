import * as ActionCable from "@rails/actioncable";

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

export const cable = ActionCable.createConsumer(`${WEBSOCKET_URL}/cable`);
