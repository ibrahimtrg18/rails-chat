import { Box, Flex, Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useRoomContext } from "../../../contexts/RoomContext";
import { useParams } from "react-router-dom";
import { axios } from "../../../libs/axios";

export const MessageAction = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const { room, initRoom } = useRoomContext();
  const { roomId } = useParams();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/v1/messages", {
        room_id: roomId,
        content: message,
      });
      setMessage("");
    } catch (e) {
      toast({
        position: "top-right",
        description: e.response.data.message,
        status: "error",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const onJoin = async () => {
    try {
      await axios.post(`/api/v1/rooms/${roomId}/join`);
      const { data } = await axios.get(`/api/v1/rooms/${roomId}`);
      initRoom(data);
    } catch (e) {}
  };

  const isUserJoined = room?.users?.some((_user) => _user.id === user.id);

  if (!isUserJoined) {
    return (
      <Box
        position="sticky"
        bottom="0"
        bg="white"
        p="4"
        boxShadow="0 0 10px 0 rgba(0,0,0,0.12)"
      >
        <Button colorScheme="blue" w="full" onClick={onJoin}>
          Join
        </Button>
      </Box>
    );
  }

  return (
    <Box
      position="sticky"
      bottom="0"
      bg="white"
      p="4"
      boxShadow="0 0 10px 0 rgba(0,0,0,0.12)"
    >
      <form onSubmit={onSubmit}>
        <Flex flexDirection="row" gap="4">
          <Input
            type="text"
            placeholder="Text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button colorScheme="blue" type="submit" isLoading={isLoading}>
            Send
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
