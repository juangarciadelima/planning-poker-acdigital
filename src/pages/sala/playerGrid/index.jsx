import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Input,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import { EuiAccordion, EuiPanel } from "@elastic/eui";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";
import { useRoomsContext } from "../../../context";
import { FiCoffee } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function PlayerGrid({ buttonContent, jogadores, idSala }) {
  const {
    resetarVotacaoHistoriaSelecionada,
    revelarVotacaoHistoriaSelecionada,
    tipoUsuario,
    historiaSelecionada,
    sala,
    polling,
    proximaHistoriaSelecionada,
    executarPollingAtualizarSala,
  } = useRoomsContext();

  const { id } = useParams();

  useEffect(() => {
    executarPollingAtualizarSala(id);
    console.log("Iniciou");
    return () => {
      polling.parar = true;
      console.log("Parou");
    };
  }, []);

  const urlConviteJogador = window.location.href + "/jogador";

  const VotoRevelado = ({ carta }) => {
    if (sala && sala.revelarVotos) {
      if (carta.tipo === "cafe") {
        return <FiCoffee />;
      } else {
        return carta.valor;
      }
    }
    return <AiOutlineCheck />;
  };

  return (
    <>
      <Box className="list-jogadores-style">
        <Box>
          <Box width="100%" marginTop="2rem">
            <Heading
              top="0"
              className="headerGrid"
              color="white"
              fontFamily="Poppins"
              fontWeight="700"
            >
              Jogadores
            </Heading>
            <Box>
              <ul>
                {jogadores &&
                  jogadores.length > 0 &&
                  //Filter that verifies if the player voted based on his email address

                  jogadores.map((jogador) => {
                    let voto =
                      historiaSelecionada &&
                      historiaSelecionada.votos.filter(
                        (voto) => voto.jogador.email === jogador.email
                      )[0];

                    return (
                      <li>
                        <cite>
                          <Text
                            fontSize="xl"
                            fontFamily="Poppins"
                            fontWeight="700"
                            ml="0.5rem"
                          >
                            {jogador.nome}
                          </Text>
                          <Text
                            right="0"
                            fontWeight="700"
                            fontSize="3xl"
                            position="relative"
                            mr="2rem"
                          >
                            {voto ? (
                              <VotoRevelado carta={voto.carta} />
                            ) : (
                              <AiOutlineQuestion />
                            )}
                          </Text>
                        </cite>
                      </li>
                    );
                  })}
              </ul>
            </Box>
          </Box>
        </Box>
        {tipoUsuario === "administrador" && (
          <>
            <ButtonGroup
              className="btnGroup"
              colorScheme="red"
              variant="outline"
              size="lg"
              marginBottom="1rem"
              d="flex"
              spacing="2rem"
              justifyContent="space-between"
              alignItems="center"
              padding="10px"
              minWidth="95%"
            >
              <Button
                className="btnGrid"
                onClick={resetarVotacaoHistoriaSelecionada}
              >
                Resetar Votação
              </Button>
              <Button
                className="btnGrid"
                disabled={sala && sala.revelarVotos}
                onClick={revelarVotacaoHistoriaSelecionada}
              >
                Revelar Votação
              </Button>
              <Button
                className="btnGrid"
                disabled={sala && !sala.revelarVotos}
                onClick={async () => await proximaHistoriaSelecionada(idSala)}
              >
                Próxima História
              </Button>
            </ButtonGroup>
            <Box
              w="100%"
              d="flex"
              justifyContent="center"
              alignItems="center"
              className="boxAccordion"
            >
              <EuiAccordion
                className="accordion"
                id="accordion1"
                buttonContent={buttonContent}
                arrowDisplay="right"
              >
                <EuiPanel color="none">
                  <Box
                    marginBottom="10px"
                    marginTop="10px"
                    background="transparent"
                    className="boxInput"
                  >
                    <Input
                      value={urlConviteJogador}
                      isReadOnly={true}
                      className="inputURL"
                    />
                    <Button
                      d="flex"
                      justifyContent="center"
                      alignItems="center"
                      colorScheme="red"
                      float="right"
                      onClick={() =>
                        navigator.clipboard.writeText(urlConviteJogador) &&
                        toast.success("URL copiada com sucesso")
                      }
                    >
                      <BiCopy />
                    </Button>
                  </Box>
                </EuiPanel>
              </EuiAccordion>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
