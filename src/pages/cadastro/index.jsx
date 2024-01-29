import React, { useState } from "react";
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
import { cadastrar } from "../../services/administrador";
import { useHistory } from "react-router-dom";
import { useRoomsContext } from "../../context";
import "./cadastro.css";
import { toast } from "react-toastify";

export default function Cadastrar() {
  const [user, setUser] = useState({ nome: "", email: "" });
  const { administrador, setLoginInContext } = useRoomsContext();

  async function signIn() {
    if(user && user.email && user.nome){
      const response = await cadastrar(user);
      if (response) {
        setLoginInContext(response, "administrado");
        history.push("/");
      } else {
        toast("Entre em contato com o Desenvolvedor");
      }
    }else{
      toast("Preencha os campos")
    }
  }

  function handleChangeNome(e) {
    setUser((oldUser) => {
      oldUser.nome = e.target.value;
      return { ...oldUser };
    });
  }

  function handleChangeEmail(e) {
    setUser((oldUser) => {
      oldUser.email = e.target.value;
      return { ...oldUser };
    });
  }
  const history = useHistory();
  return (
    <Flex alignItems="center" justify="center" minH="90vh" marginBottom="3rem">
      <Stack spacing="10" py="12" px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Faça o cadastro da sua conta</Heading>
        </Stack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <Box rounded="lg" bg="gray.200" boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <FormControl id="nome" onSubmit={(e) => e.preventDefault()}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="name"
                  placeholder="Nome"
                  size="lg"
                  onChange={handleChangeNome}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
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
                  onClick={signIn}
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
  );
}

// ANCHOR Trocar uma ideia sobre como funcionará para saber se o usuário acertou o seu login, ou não
