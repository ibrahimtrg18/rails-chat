import { RoomContextProvider } from "../../contexts/RoomContext";
import { RoomIdView } from "./Fragments/RoomIdView";

function RoomIdPage() {
  return (
    <RoomContextProvider>
      <RoomIdView />
    </RoomContextProvider>
  );
}

export default RoomIdPage;
