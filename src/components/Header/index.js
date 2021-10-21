import {
  Flex,
  Box,
  Spacer,
  Heading,
  Image,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./Header.css";
import { logout } from "../../services/auth/login";
import ACLogo from "../../Images/ACLogo.png";
import { useHistory } from "react-router-dom";
import { useRoomsContext } from "../../contexts";

export default function Header() {
  const { user, setUser } = useRoomsContext();
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
      {user && user.nome ? (
        <Box d="flex" mr="7rem" className="imgBox">
          <Menu>
            <MenuButton as={Button}>
              <div>
                Seja Bem Vindo
                <strong>,{user.nome}</strong>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  logout(setUser);
                  history.push("/");
                }}
              >
                Deslogar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push("/home");
                  console.log(user.nome);
                }}
              >
                Voltar para Salas
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Button
          fontWeight="700"
          onClick={() => {
            history.push("/");
          }}
        >
          Faça seu Login
        </Button>
      )}
    </Flex>
  );
}
