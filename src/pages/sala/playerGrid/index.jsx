import React from "react";
import {
  Box,
  Grid,
  Heading,
  Flex,
  Text,
  Avatar,
  ButtonGroup,
  Button,
  Input,
} from "@chakra-ui/react";
import { EuiAccordion, EuiPanel } from "@elastic/eui";
import {
  serviceReiniciarVotacao,
  serviceFinalizarVotacao,
} from "../../../services/historias";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";
import { useRoomsContext } from "../../../context";

export default function PlayerGrid({
  buttonContent,
  sala,
  setClassCarta,
  historias,
}) {
  const { reiniciarVotacaoHistoriaSelecionada, finalizarVotacaoHistoriaSelecionada, tipoUsuario } = useRoomsContext()
  const urlConviteJogador = window.location.href + "/jogador";

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
                {sala.jogadores?.map((jogador) => (
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
                        ?
                      </Text>
                    </cite>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
        {tipoUsuario === "administrador" &&
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
              minWidth="100%"
            >
              <Button
                className="btnGrid"
                onClick={reiniciarVotacaoHistoriaSelecionada}
              >
                Resetar Votação
              </Button>
              <Button
                className="btnGrid"
                onClick={finalizarVotacaoHistoriaSelecionada}
              >
                Finalizar Votação
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
        }
      </Box>
    </>
  );
}
