import { useState } from "react";
import {
  Modal,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { axios } from "../../../libs/axios";
import { useRoomContext } from "../../../contexts/RoomContext";

const initialName = "";

export const RoomCreateModal = (props) => {
  const { onClose } = props;
  const [name, setName] = useState(initialName);
  const { addRoom } = useRoomContext();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/v1/rooms", {
        name,
      });

      addRoom(data);
      onClose();
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

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent p="4">
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Room Name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Room Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              Create
            </Button>
          </Stack>
        </form>
      </ModalContent>
    </Modal>
  );
};
