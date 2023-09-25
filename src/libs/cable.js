import * as ActionCable from "@rails/actioncable";

export const cable = ActionCable.createConsumer("ws://localhost:5000/cable");
