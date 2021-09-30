import React from "react";
import {
  Box,
  Grid,
  Flex,
  Heading,
  Input,
  Link,
  Button,
  Text,
  Divider,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

import "./loginScreen.css";

import AcLogo from "../../Images/AC Digital.png";
export default function LoginScreen() {
  const history = useHistory();
  return (
    <Flex alignItems="center" justify="center" minH="90vh" marginBottom="3rem">
      <Stack spacing="8" py="12" px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Faça Login em sua conta</Heading>
        </Stack>
        <Box rounded="lg" bg="gray.200" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="nome">
              <FormLabel>Nome</FormLabel>
              <Input type="name" placeholder="Nome" size="lg" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" size="lg" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                marginTop="3rem"
                bg="red.600"
                color="white"
                _hover={{
                  bg: "red.500",
                }}
                onClick={() => history.push("/home")}
              >
                Logar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
