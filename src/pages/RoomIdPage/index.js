import { useParams } from "react-router-dom";
import { RoomContextProvider } from "../../contexts/RoomContext";
import { MessageHistory } from "./Fragments/MessageHistory";

function RoomIdPage() {
  const { roomId } = useParams();

  return (
    <RoomContextProvider roomId={roomId}>
      <MessageHistory />
    </RoomContextProvider>
  );
}

export default RoomIdPage;
