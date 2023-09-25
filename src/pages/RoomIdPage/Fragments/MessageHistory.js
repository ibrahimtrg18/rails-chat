import React, { useEffect } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useRoomContext } from "../../../contexts/RoomContext";
import { axios } from "../../../libs/axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { cable } from "../../../libs/cable";

export const MessageHistory = () => {
  const { user } = useAuthContext();
  const { messages, initMessages, addMessage } = useRoomContext();
  const { roomId } = useParams();
  const { token } = useAuthContext();

  useEffect(() => {
    cable.subscriptions.create(
      {
        channel: "ChatChannel",
        room_id: roomId,
        token,
      },
      {
        connected: () => {
          console.log("Connected to ChatChannel");
        },
        disconnected: () => {
          console.log("Disconnected from ChatChannel");
        },
        received(data) {
          // Handle incoming messages
          addMessage(data);
        },
      }
    );
  }, []);

  useEffect(() => {
    if (roomId) {
      (async () => {
        const response = await axios.get(`/api/v1/rooms/${roomId}/messages`);

        initMessages(response.data);
      })();
    }
  }, [roomId]);

  return (
    <Flex flexDirection="column" gap="2">
      <Box borderWidth="1px" boxShadow="lg">
        <VStack spacing={2} align="start" p="4">
          {messages.map((message) => (
            <Box
              flex={1}
              key={message.id}
              bg="gray.100"
              px="4"
              py="2"
              borderRadius="xl"
            >
              <Text fontSize="xs">{message.user.username}</Text>
              <Text fontSize="md">{message.content}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};
