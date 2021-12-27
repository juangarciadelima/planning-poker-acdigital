import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import "./header.css";
import { logout } from "../../services/administrador";
import ACLogo from "../../assets/ACLogo.png";
import { useHistory } from "react-router-dom";
import { useRoomsContext } from "../../context";

export default function Header() {
  const { tipoUsuario, limparContexto, usuario } = useRoomsContext();

  const history = useHistory();

  //Condicional se estiver no contexto -> Tal ação (a se decidir) -> Senão, outra ação

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      padding={3}
      bg="gray.100"
      borderBottom="1px solid"
      borderBottomWidth="hairline"
      borderBottomColor="#FF2E34"
      className="header"
      position="relative"
      w="100%"
    >
      <Box ml="3rem" width="10%" height="10%" cursor="pointer">
        <img src={ACLogo} />
      </Box>

      <Spacer />
      <Spacer />
      {usuario && usuario.nome ? (
        <Box d="flex" mr="7rem" className="imgBox">
          <Menu>
            <MenuButton as={Button}>
              <div>
                Seja Bem Vindo
                <strong>, {usuario.nome}</strong>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  history.push("/");
                }}
              >
                Salas
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout(limparContexto);
                  history.push("/login");
                }}
              >
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <ButtonGroup spacing={3}>
          <Button
            colorScheme="red"
            fontWeight="700"
            onClick={() => {
              history.push("/cadastrar");
            }}
          >
            Cadastrar
          </Button>
          <Button
            fontWeight="700"
            onClick={() => {
              history.push("/");
            }}
          >
            Faça seu Login
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
}
//Se tiver logado como administrador, mostrar o nome do administrador, o mesmo para o jogador, e se estiver deslogado, mostrar o botão de login.
