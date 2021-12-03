import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

import { useHistory } from "react-router";
import "./jogador.css";
export default function SalaJogador() {
  const [jogador, setJogador] = useState({ nome: "", email: "" });
  const history = useHistory();

  return (
    <>
      <Box marginTop="2rem">
        <Heading
          lineHeight={1.1}
          fontSize="5xl"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          Entrar na Sala
        </Heading>
        <Flex
          minH={"20vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={5}
            my={12}
          >
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) =>
                  setJogador({ ...jogador, email: e.target.value })
                }
                placeholder="teste@teste.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="name"
                placeholder="JuanGarcia"
                onChange={(e) =>
                  setJogador({ ...jogador, nome: e.target.value })
                }
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"red.600"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                onClick={() => console.log(jogador)}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
      );
    </>
  );
}
