import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Flex,
  Button,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRoomContext } from "../../../contexts/RoomContext";
import { Link } from "react-router-dom";
import { axios } from "../../../libs/axios";
import { RoomCreateModal } from "./RoomCreateModal";
import { useAuthContext } from "../../../contexts/AuthContext";

export const RoomList = () => {
  const { user } = useAuthContext();
  const { rooms, initRooms } = useRoomContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/rooms`);

        initRooms(response.data);
      } catch (e) {
        toast({
          position: "top-right",
          description: e.response.data.message,
          status: "error",
          isClosable: true,
        });
      }
    })();
  }, []);

  return (
    <Box p="4">
      <RoomCreateModal isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="space-between" mb="4" alignItems="center">
        <Heading as="h2" size="md">
          Room List
        </Heading>
        <Button onClick={onOpen}>Create Room</Button>
      </Flex>
      <Grid gap="4" templateColumns="repeat(3, 1fr)">
        {rooms.map((room) => {
          const usersCount = room.users.length;
          const isJoined = room.users.some((_user) => _user.id === user.id);

          return (
            <Link to={`/rooms/${room.id}`}>
              <GridItem>
                <Flex
                  key={room.id}
                  justifyContent="space-between"
                  flexWrap="wrap"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="lg"
                  p="4"
                  {...(isJoined && {
                    bgColor: "blue.50",
                  })}
                >
                  <Heading fontSize="lg" textTransform="capitalize">
                    {room.name}
                  </Heading>
                  <Text fontSize="sm">{usersCount} users</Text>
                </Flex>
              </GridItem>
            </Link>
          );
        })}
      </Grid>
    </Box>
  );
};
