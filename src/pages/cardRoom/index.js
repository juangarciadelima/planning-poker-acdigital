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

import { cards } from "./cards";

export default function CardRoom() {
  const clickMe = (num) => {
    console.log(`You clicked the card of number ${num}`);
  };

  const clickSvg = () => {
    alert("Quer deletar mesmo a história?");
  };

  return (
    <div className="grid">
      <Grid
        marginLeft="1rem"
        templateColumns="1.75fr 1fr"
        gap={2}
        className="gridCustom"
      >
        <Box
          marginTop="2rem"
          w="100%"
          h="750px"
          marginLeft="2rem"
          className="box"
        >
          <Grid templateRows="0.4fr 1.5fr 0.5fr" gap={8}>
            <Box w="100%">
              <Text
                className="text"
                d="flex"
                alignItems="center"
                fontSize="3xl"
                fontFamily="Poppins"
                justifyContent="center"
              >
                História Teste
              </Text>
            </Box>
            <Box className="boxCard">
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
                      <span className="numCardL">{card.title}</span>
                      <span className="numCardR">{card.title}</span>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              h="200px"
              w="100%"
              justifyContent="center"
              alignItems="center"
              background="gray.100"
            >
              <Tabs
                className="tab"
                size="md"
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
                  >
                    New
                  </Button>
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
          border="1px solid #f2f2f2"
          w="550px"
          d="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          position="relative"
          className="gridTwo"
        >
          <Grid
            templateColumns="1fr"
            templateRows=" 1fr 1fr 0.5fr"
            w="100%"
            h="100%"
            gap={0}
            background="gray.100"
            borderRadius="5px"
          >
            <Box
              w="100%"
              d="flex"
              position="relative"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%" marginTop="2rem">
                <Heading
                  className="headerGrid"
                  color="white"
                  fontFamily="Poppins"
                  fontWeight="700"
                >
                  Players
                </Heading>
                <Table size="lg" className="tableGridTwo">
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

            <ButtonGroup
              className="btnGroup"
              colorScheme="red"
              variant="outline"
              size="lg"
              marginBottom="1rem"
              d="flex"
              spacing="30px"
              justifyContent="center"
              alignItems="center"
              padding="10px"
              minWidth="100%"
            >
              <Button className="btnGrid">Reset Votes</Button>
              <Button className="btnGrid">Flip Cards</Button>
            </ButtonGroup>

            <Box
              w="100%"
              d="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              marginBottom="2rem"
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
