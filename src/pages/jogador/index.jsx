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

import { useHistory, useParams } from "react-router-dom";
import { useRoomsContext } from "../../context";
import { serviceCadastrarJogador } from "../../services/jogador";
import { toast } from "react-toastify";
export default function SalaJogador() {
  const [novoJogador, setNovoJogador] = useState({ nome: "", email: "" });
  const { jogador, setJogador, setLoginInContext } = useRoomsContext();
  const history = useHistory();
  const { id } = useParams();

  async function logar() {
    if (novoJogador && novoJogador.nome && novoJogador.email) {
      const response = await serviceCadastrarJogador(id, novoJogador);
      setJogador(response);
      setLoginInContext(response, "jogador");
      history.push(`/sala/${id}`);
    } else {
      toast("Preencha o campo");
    }
  }

  function handleChangeNome(e) {
    setNovoJogador((oldUser) => {
      oldUser.nome = e.target.value;
      return { ...oldUser };
    });
  }

  function handleChangeEmail(e) {
    setNovoJogador((oldUser) => {
      oldUser.email = e.target.value;
      return { ...oldUser };
    });
  }
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
        <Flex minH={"20vh"} align={"center"} justify={"center"}>
          <Stack
            spacing={4}
            w={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={5}
            my={12}
          >
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="name"
                placeholder="JuanGarcia"
                onChange={handleChangeNome}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleChangeEmail}
                placeholder="teste@teste.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"red.600"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                onClick={() => logar()}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
