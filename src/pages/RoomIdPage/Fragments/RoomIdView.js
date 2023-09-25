import { Fragment, useEffect } from "react";
import { MessageHistory } from "./MessageHistory";
import { MessageAction } from "./MessageAction";
import { useParams } from "react-router-dom";
import { axios } from "../../../libs/axios";
import { useRoomContext } from "../../../contexts/RoomContext";

export const RoomIdView = () => {
  const { roomId } = useParams();
  const { initRoom } = useRoomContext();

  useEffect(() => {
    if (roomId) {
      (async () => {
        try {
          const { data } = await axios.get(`/api/v1/rooms/${roomId}`);
          initRoom(data);
        } catch (e) {}
      })();
    }
  }, [roomId]);

  return (
    <Fragment>
      <MessageHistory />
      <MessageAction />
    </Fragment>
  );
};
