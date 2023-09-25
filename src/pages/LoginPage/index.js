import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { axios } from "../../libs/axios";
import { useAuthContext } from "../../contexts/AuthContext";

const initialValues = {
  username: "",
  password: "",
};

function LoginPage() {
  const { initializeToken } = useAuthContext();
  const [values, setValues] = useState();
  const toast = useToast();

  const onValuesChange = (e) => {
    const { name, value } = e.target;

    setValues((_values) => ({
      ...values,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/login", values);
      initializeToken(data.token);
      setValues(initialValues);
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
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
    >
      <Heading>Login</Heading>
      <Box
        minW="md"
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        p="6"
        m="4"
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={onValuesChange}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onValuesChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Sign In
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginPage;
