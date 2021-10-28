import React from "react";
import "../../cardRoom.css";
import {
  Box,
  Grid,
  Text,
  Heading,
  Tabs,
  TabList,
  Button,
  TabPanels,
  TabPanel,
  Tab,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { EuiNotificationBadge } from "@elastic/eui";
import { ToastContainer } from "react-toastify";
import { TiCoffee } from "react-icons/ti";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
export default function GridOne({
  sala,
  historias,
  storyModal,
  editModal,
  deleteModal,
  showDeleteModal,
  showEditModal,
}) {
  return (
    <>
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
            {sala && sala.metodologias
              ? sala.metodologias.cartas.map((card, index, { valor }) => (
                  <>
                    <Box className="cardBox">
                      <Box
                        className={
                          card.selected == true ? "cardSelected" : "card"
                        }
                        onClick={() =>
                          (card["selected"] = true) && console.log(card)
                        }
                      >
                        {card.tipo == "cafe" ? (
                          <>
                            <Heading
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                              fontWeight="light"
                              fontSize="30px"
                              fontFamily="Poppins"
                            >
                              <TiCoffee />
                            </Heading>
                            <span className="numCardR">
                              <TiCoffee />
                            </span>
                            <span className="numCardL">
                              <TiCoffee />
                            </span>
                          </>
                        ) : (
                          <>
                            <Heading
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                              fontWeight="light"
                              fontSize="30px"
                              fontFamily="Poppins"
                            >
                              {card.valor}
                            </Heading>
                            <span className="numCardR">{card.valor}</span>
                            <span className="numCardL">{card.valor}</span>
                          </>
                        )}
                      </Box>
                    </Box>
                  </>
                ))
              : "Heyheyhey"}
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
                            <ToastContainer />
                            <i onClick={showDeleteModal}>
                              <DeleteIcon marginRight="15px" />
                            </i>
                            {deleteModal}
                            {editModal}
                            <i onClick={showEditModal}>
                              <EditIcon />
                            </i>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TabPanel>
                <TabPanel>
                  {" "}
                  <Table
                    variant="striped"
                    colorScheme="red"
                    className="tableGrid"
                  >
                    <Thead>
                      <Th></Th>
                      <Th isNumeric></Th>
                    </Thead>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
