import { useEffect } from "react";
import { MessageHistory } from "./MessageHistory";
import { MessageAction } from "./MessageAction";
import { Link, useParams } from "react-router-dom";
import { axios } from "../../../libs/axios";
import { useRoomContext } from "../../../contexts/RoomContext";
import { Box, Flex, Heading } from "@chakra-ui/react";

export const RoomIdView = () => {
  const { roomId } = useParams();
  const { initRoom, room } = useRoomContext();

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
    <Box borderWidth="1px" boxShadow="lg">
      <Box px="4" py="2">
        <Link to="/rooms">Go Back</Link>
      </Box>
      <Box p="4">
        <Heading>Room {room.name}</Heading>
      </Box>
      <Flex flexDirection="column" justifyContent="space-between" minH="100vh">
        <MessageHistory />
        <MessageAction />
      </Flex>
    </Box>
  );
};
