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
} from "@chakra-ui/react";
import { axios } from "../../libs/axios";
import { useAuthContext } from "../../contexts/AuthContext";

function LoginPage() {
  const { initializeToken } = useAuthContext();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

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
    } catch (e) {
      console.log(e);
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
