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
import { serviceAlterarSala } from "../../services/salas";
import { toast } from "react-toastify";

export default function Header() {
  const { limparContexto, usuario, tipoUsuario, jogador, sala, setSala, setHistoriaSelecionada, setListaJogadoresVotos } = useRoomsContext();
  const history = useHistory();

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
              {tipoUsuario == "administrador" && (
                <MenuItem
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Salas
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  setSala({
                    nome: "",
                    metodologias: { cartas: [] },
                    jogadores: [],
                    historias: [],
                  });
                  setHistoriaSelecionada(null)
                  setListaJogadoresVotos([])
                  history.push("/");
                }}
              >
                Salas
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if(tipoUsuario === "jogador"){
                    let novaSala = sala
                    novaSala.jogadores = novaSala.jogadores.filter(_jogador => _jogador.email !== jogador.email)
                    serviceAlterarSala(novaSala).then(response => toast("Operação bem sucedida"))
                  }
                  limparContexto();
                  logout();
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
              history.push("/login");
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
