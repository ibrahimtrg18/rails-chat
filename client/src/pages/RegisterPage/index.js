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
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  username: "",
  password: "",
};

function RegisterPage() {
  const [values, setValues] = useState(initialValues);
  const toast = useToast();
  const navigate = useNavigate();

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
      const { message } = await axios.post("/api/v1/users", { user: values });
      navigate("/");
      toast({
        position: "top-right",
        description: message,
        status: "error",
        isClosable: true,
      });
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
      <Heading>Register</Heading>
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
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={onValuesChange}
              />
            </FormControl>

            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={onValuesChange}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
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

export default RegisterPage;
