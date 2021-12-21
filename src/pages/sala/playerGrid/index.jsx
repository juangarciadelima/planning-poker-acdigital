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
export default function PlayerGrid({ buttonContent, sala }) {
  const urlGuardada = window.location.href + "/jogador";

  console.log(sala);
  return (
    <>
      <Box
        marginTop="1rem"
        w="500px"
        d="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="3px"
        marginLeft="8rem"
      >
        <Grid
          templateColumns="1fr"
          templateRows=" 1fr 1fr 1fr"
          w="100%"
          gap={0}
          borderRadius="5px"
          className="gridTwo"
        >
          <Box
            w="100%"
            d="flex"
            justifyContent="center"
            alignItems="center"
            h="200px"
          >
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

              <Flex
                justifyContent="flex-start"
                alignItems="center"
                className="playerBox"
              >
                <ul
                  style={{
                    marginTop: "3rem",
                  }}
                >
                  {sala.jogadores.map((jogador) => (
                    <li>
                      <cite>
                        <Text
                          fontSize="md"
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
                          position="absolute"
                          mr="2rem"
                        >
                          3
                        </Text>
                      </cite>
                    </li>
                  ))}
                </ul>
              </Flex>
            </Box>
          </Box>

          <ButtonGroup
            className="btnGroup"
            colorScheme="red"
            variant="outline"
            size="lg"
            marginBottom="1rem"
            d="flex"
            spacing="6rem"
            justifyContent="center"
            alignItems="center"
            padding="10px"
            minWidth="100%"
          >
            <Button className="btnGrid">Resetar Votação</Button>
            <Button className="btnGrid">Virar Cartas</Button>
            <Button className="btnGrid">Finalizar Votação</Button>
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
                  <Input value={urlGuardada} w="300px" />
                </Box>
              </EuiPanel>
            </EuiAccordion>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
