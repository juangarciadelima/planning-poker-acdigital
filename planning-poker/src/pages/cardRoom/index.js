import React from "react";
import "./cardRoom.css";

//ANCHOR
//TODO Refactor Code
//FIXME Componentize the code

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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  Input,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
} from "@chakra-ui/react";

import { AddIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";

import { EuiNotificationBadge } from "@elastic/eui";

import cards from "./components/cards";

export default function CardRoom() {
  const clickMe = (num) => {
    console.log(`You clicked the card of number ${num}`);
  };

  const clickSvg = () => {
    alert("Quer deletar mesmo a história?");
  };

  return (
    <div className="grid">
      <Grid marginLeft="1rem" templateColumns="1.75fr 1fr" gap={2}>
        <Box marginTop="2rem" w="100%" h="750px" marginLeft="2rem">
          <Grid templateRows="0.4fr 1.5fr 0.5fr" gap={8}>
            <Box
              textAlign="center"
              d="flex"
              justifyContent="center"
              w="90%"
              alignItems="center"
            >
              <Text alignItems="center" fontSize="3xl" fontFamily="Poppins">
                História Teste
              </Text>
            </Box>
            <Box
              boxShadow=" 0px 0px 1px 0px rgba(0, 0, 0, 0.75)"
              d="flex"
              w="90%"
              justifyContent="center"
              alignItems="center"
              h="400px"
            >
              {cards.map((card) => (
                <Box key={card.id}>
                  <Box>
                    <Box
                      className="card"
                      onClick={() => {
                        clickMe(card.title);
                      }}
                    >
                      <Heading>{card.title}</Heading>
                      <span className="numCardR">{card.title}</span>
                      <span className="numCardL">{card.title}</span>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box h="200px" w="90%" justifyContent="center" alignItems="center">
              <Tabs
                className="tab"
                size="lg"
                variant="line"
                position="relative"
              >
                <TabList>
                  <Tab>
                    Active Stories
                    <Box marginLeft="10px">
                      <EuiNotificationBadge className="tabBadge">
                        1
                      </EuiNotificationBadge>
                    </Box>
                  </Tab>
                  <Tab>
                    Completed Stories
                    <Box marginLeft="10px">
                      <EuiNotificationBadge color="subdued">
                        0
                      </EuiNotificationBadge>
                    </Box>
                  </Tab>
                  <Tab>
                    All Stories
                    <Box marginLeft="10px">
                      <EuiNotificationBadge color="subdued">
                        0
                      </EuiNotificationBadge>
                    </Box>
                  </Tab>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<AddIcon />}
                    className="btn"
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<EditIcon />}
                    className="btn"
                    right="0"
                  >
                    Edit
                  </Button>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Table variant="striped" colorScheme="red">
                      <Thead>
                        <Th></Th>
                        <Th isNumeric></Th>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Name of History</Td>
                          <Td isNumeric>
                            <i onClick={clickSvg}>
                              <CloseIcon />
                            </i>
                          </Td>
                        </Tr>
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
          marginRight="1rem"
          h="750px"
          boxShadow=" 0px 0px 1px 0px rgba(0, 0, 0, 0.75)"
          w="550px"
          d="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          position="relative"
        >
          <Grid
            templateColumns="1fr"
            templateRows=" 1fr 1fr 0.5fr"
            w="100%"
            h="100%"
            gap={0}
          >
            <Box
              w="100%"
              d="flex"
              position="relative"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%">
                <Heading
                  className="header"
                  color="white"
                  fontFamily="Poppins"
                  fontWeight="700"
                >
                  Players
                </Heading>
                <Table size="lg">
                  <Thead></Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <cite>
                          <Avatar
                            name="Dan Abrahmov"
                            size="lg"
                            src="https://bit.ly/dan-abramov"
                          />
                          <Text
                            fontSize="md"
                            fontFamily="Poppins"
                            fontWeight="700"
                          >
                            Dan Abrahmov
                          </Text>
                        </cite>
                      </Td>
                      <Td></Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <cite>
                          <Avatar
                            size="lg"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                          />

                          <Text
                            fontSize="md"
                            fontFamily="Poppins"
                            fontWeight="700"
                          >
                            Dan Abrahmov
                          </Text>
                        </cite>
                      </Td>
                      <Td isNumeric>
                        <Text
                          fontSize="3xl"
                          fontFamily="Poppins"
                          fontWeight="light"
                        >
                          3
                        </Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Box>

            <Box w="100%" d="flex" justifyContent="center" alignItems="center">
              <ButtonGroup
                colorScheme="red"
                variant="outline"
                size="lg"
                marginBottom="5rem"
                d="flex"
                spacing="30px"
                justifyContent="center"
                alignItems="center"
                padding="10px"
                minWidth="100%"
              >
                <Button>Reset Votes</Button>
                <Button>Flip Cards</Button>
              </ButtonGroup>
            </Box>
            <Box
              w="100%"
              d="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Accordion allowToggle w="100%">
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Heading
                        fontSize="2xl"
                        fontFamily="Poppins"
                        fontWeight="light"
                      >
                        Convide os seus colegas
                      </Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Box>
                      <Box marginBottom="10px" marginTop="10px">
                        <Input value="https://github.com/juangarciadelima" />
                      </Box>
                      <Box>
                        <span
                          style={{
                            textAlign: "center",
                            fontFamily: "Poppins",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#808284",
                            textTransform: "uppercase",
                          }}
                        >
                          Ou envie um e-mail
                        </span>
                        <Textarea
                          marginTop="1rem"
                          placeholder="Insira o e-mail para enviarmos o convite"
                        />
                      </Box>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
