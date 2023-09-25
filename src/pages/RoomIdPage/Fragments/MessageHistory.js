import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { cable } from "../../../libs/cable";
import { useRoomContext } from "../../../contexts/RoomContext";
import { useAuthContext } from "../../../contexts/AuthContext";

export const MessageHistory = () => {
  const [message, setMessage] = useState("");
  const { messages } = useRoomContext();
  const { token } = useAuthContext();
  const { roomId } = useParams();

  const chatChannel = cable;

  useEffect(() => {
    chatChannel.subscriptions.create(
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
        },
      }
    );

    return () => {
      chatChannel.disconnect();
    };
  }, [chatChannel, messages]);

  const handleSendMessage = () => {
    chatChannel.send({ message });
    setMessage("");
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
      <Flex
        position="sticky"
        bottom="0"
        flexDirection="row"
        gap="4"
        bg="white"
        p="4"
        boxShadow="0 0 10px 0 rgba(0,0,0,0.12)"
      >
        <Input
          type="text"
          placeholder="Text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
};
