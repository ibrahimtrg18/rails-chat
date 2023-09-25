import React, { useEffect } from "react";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { useRoomContext } from "../../../contexts/RoomContext";
import { Link } from "react-router-dom";
import { axios } from "../../../libs/axios";

export const RoomList = () => {
  const { rooms, initRooms } = useRoomContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/rooms`);

        initRooms(response.data);
      } catch (e) {}
    })();
  }, []);

  return (
    <Box p="4">
      <Heading as="h2" size="md" mb="4">
        Room List
      </Heading>
      <Grid gap="4" templateColumns="repeat(3, 1fr)">
        {rooms.map((room) => (
          <Link to={`/rooms/${room.id}`}>
            <GridItem>
              <Box
                key={room.id}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                p="4"
              >
                <Heading fontSize="lg" textTransform="capitalize">
                  {room.name}
                </Heading>
              </Box>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};
