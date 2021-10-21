import React, { useState, useEffect } from "react";
import "./cardRoom.css";

//TODO Refactor Code

// ANCHOR Use more than one UseEffect
//
import {
  Grid,
  Box,
  Text,
  Button,
  ButtonGroup,
  Heading,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { toast, ToastContainer } from "react-toastify";

import { EuiNotificationBadge, EuiAccordion, EuiPanel } from "@elastic/eui";

import FormSample from "../../components/forms/formSample";
import { enterRoom } from "../../services/rooms";
import {
  getOpenHistory,
  getClosedHistory,
  createHistory,
} from "../../services/histories";

export default function CardRoom() {
  const [isStoryModalVisible, setStoryModal] = useState(false);
  const [room, setRoom] = useState(JSON.parse(localStorage.getItem("room")));
  const [historias, setHistorias] = useState([]);
  //ANCHOR Pedir Ajuda pro Oliveira em três pontos : Há a possibilidade de criar essa estrutura de dados :
  // {historiasAtivas : [],
  //  historiasFechadas : [],} & como trocar automaticamente o dado de se está logado ou não quando entrar na sala(Inserido no Header)
  //Perguntar o que ele acha de definir requisições só feitas com a presença do usuário estar autenticado, assim, evitando que ajam renderizações desnecessárias
  //Mais uma coisa(Hehe) -> Comentar sobre como funcionará a lógica de votações
  useEffect(async () => {
    const res = await getOpenHistory();
    setHistorias(res);
  }, []);

  const buttonContent = (
    <Heading fontSize="2xl" fontFamily="Poppins" fontWeight="light">
      Convide os seus colegas
    </Heading>
  );

  const closeStoryModal = () => setStoryModal(false);
  const showStoryModal = () => setStoryModal(true);
  const clickMe = (num) => {
    console.log(`You clicked the card of number ${num}`);
  };

  async function toastStory() {
    closeStoryModal();

    toast("História criada");
  }

  const handleChange = (e) => {
    setHistoria(e.target.value);
  };

  const clickSvg = () => {
    alert("Quer deletar mesmo a história?");
  };

  let storyModal;

  if (isStoryModalVisible) {
    storyModal = (
      <FormSample
        onClose={closeStoryModal}
        modalHeader="Criar a História"
        modalBody={
          <FormControl id="room-name " isRequired>
            <FormLabel>Nome da História</FormLabel>
            <Input placeholder="Nome da História" onChange={handleChange} />
          </FormControl>
        }
        onClick={closeStoryModal}
        onClickBtn={toastStory}
        lBtnText="Sair"
        rBtnText="Criar"
      />
    );
  }

  return (
    <div className="grid">
      <Grid
        marginRight="5rem"
        templateColumns="1.75fr 1fr"
        gap={2}
        className="gridCustom"
      >
        <Box
          marginTop="2rem"
          w="100%"
          h="750px"
          className="box"
          marginRight="2rem"
          d="flex"
          justifyContent="center"
        >
          <Grid templateRows="0.4fr 1.5fr 0.5fr" gap={8} className="gridOne">
            <Box w="100%">
              <Text
                className="text"
                d="flex"
                alignItems="center"
                fontSize="4xl"
                fontFamily="Poppins"
                justifyContent="center"
              >
                {historias.length > 0 ? (
                  historias[0].nome
                ) : (
                  <Text>Loading...</Text>
                )}
              </Text>
            </Box>
            <Box className="boxCard" w="100%">
              {room.metodologias
                ? room.metodologias.cartas.map((card) => (
                    <Box key={card.id} className="cardBox">
                      <Box className="card">
                        <Heading>{card.valor}</Heading>
                        <span className="numCardL">{card.valor}</span>
                        <span className="numCardR">{card.valor}</span>
                      </Box>
                    </Box>
                  ))
                : "Não foi possível encontrar as cartas"}
            </Box>
            <Box
              h="200px"
              w="100%"
              justifyContent="center"
              alignItems="center"
              marginBottom="3rem"
              className="tabBox"
            >
              <Tabs
                className="tab"
                size="md"
                variant="line"
                position="relative"
                width="1000px"
              >
                {storyModal}
                <TabList>
                  <Tab>
                    Histórias Abertas
                    <Box marginLeft="10px">
                      <EuiNotificationBadge className="tabBadge">
                        {historias.length}
                      </EuiNotificationBadge>
                    </Box>
                  </Tab>
                  <Tab>
                    Histórias Fechadas
                    <Box marginLeft="10px">
                      <EuiNotificationBadge className="tabBadge">
                        0
                      </EuiNotificationBadge>
                    </Box>
                  </Tab>

                  <Button
                    className="btnTab"
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<AddIcon />}
                    style={{
                      position: "absolute",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      right: 0,
                      marginRight: "1rem",
                      marginTop: "0.4rem",
                    }}
                    onClick={() => {
                      showStoryModal();
                    }}
                  >
                    Nova
                  </Button>
                  <ToastContainer />
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Table
                      variant="striped"
                      colorScheme="red"
                      className="tableGrid"
                    >
                      <Thead>
                        <Th></Th>
                        <Th isNumeric></Th>
                      </Thead>
                      <Tbody>
                        {historias.map((history) => (
                          <Tr>
                            <Td>{history.nome}</Td>
                            <Td isNumeric>
                              <i onClick={clickSvg}>
                                <CloseIcon />
                              </i>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel>Tchau</TabPanel>
                  <TabPanel>Tchau</TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Grid>
        </Box>
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
                    <li>
                      <cite>
                        <Avatar
                          name="Dan Abrahmov"
                          size="lg"
                          src="https://bit.ly/dan-abramov"
                          marginLeft="1rem"
                        />
                        <Text
                          fontSize="md"
                          fontFamily="Poppins"
                          fontWeight="700"
                          ml="0.5rem"
                        >
                          Dan Abrahmov
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
                    <li>
                      <cite>
                        <Avatar
                          name="Dan Abrahmov"
                          size="lg"
                          src="https://bit.ly/dan-abramov"
                          marginLeft="1rem"
                        />
                        <Text
                          fontSize="md"
                          fontFamily="Poppins"
                          fontWeight="700"
                          ml="0.5rem"
                        >
                          Dan Abrahmov
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
                      placeholder="https://github.com/juangarciadelima"
                      w="300px"
                    />
                  </Box>
                </EuiPanel>
              </EuiAccordion>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
