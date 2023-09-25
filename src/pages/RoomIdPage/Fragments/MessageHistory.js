import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRoomContext } from "../../../contexts/RoomContext";
import { axios } from "../../../libs/axios";
import { useParams } from "react-router-dom";

export const MessageHistory = () => {
  const [message, setMessage] = useState("");
  const { messages } = useRoomContext();
  const { roomId } = useParams();
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <Flex flexDirection="column" gap="2">
      <Box borderWidth="1px" boxShadow="lg">
        <VStack spacing={2} align="start" p="4">
          {messages.map((message) => (
            <Box flex={1} key={message.id}>
              <Text fontSize="md">{message.content}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
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
            <Button colorScheme="blue" type="submit">
              Send
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
