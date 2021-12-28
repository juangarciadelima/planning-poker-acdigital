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
      if (response) {
        setJogador(novoJogador);
        setLoginInContext(novoJogador, "jogador");
        history.push(`/sala/${id}`);
      }
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
      <Flex
        alignItems="center"
        justify="center"
        minH="90vh"
        marginBottom="3rem"
      >
        <Stack spacing="10" py="12" px={6} w="20%">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Entrar na Sala</Heading>
          </Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              logar();
            }}
          >
            <Box rounded="lg" bg="gray.200" boxShadow="lg" p={8}>
              <Stack spacing={4}>
                <FormControl
                  id="nome"
                  onSubmit={(e) => e.preventDefault()}
                  isRequired
                >
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="name"
                    placeholder="Escreva seu nome"
                    size="lg"
                    onChange={handleChangeNome}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Escreva seu email"
                    size="lg"
                    onChange={handleChangeEmail}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    marginTop="3rem"
                    bg="red.600"
                    color="white"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={() => logar()}
                    type="submit"
                  >
                    Logar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </>
  );
}
