import React, { useState } from "react";
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
import { toast } from "react-toastify";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Metodologia } from "./metodologia";
import FormCreateHistory from "../../../../components/forms/formCreateHistory";
import {
  serviceAtualizarHistoria,
  serviceCriarHistoria,
} from "../../../../services/historias";
import FormEditHistory from "../../../../components/forms/formEditHistory";
export default function GridOne({
  id,
  historias,

  deleteModal,
  showDeleteModal,
}) {
  const [historiaSelecionada, setHistoriaSelecionada] = useState(null);

  const [novaHistoria, setNovaHistoria] = useState();

  const [createModal, setCreateModal] = useState(false);
  const closeCreateModal = () => {
    setCreateModal(false);
    setNovaHistoria(null);
  };
  const showCreateModal = () => {
    setCreateModal(true);
    setNovaHistoria(criarHistoria());
  };

  let createHistoryModal;
  let editHistoryModal;

  const [editModal, setEditModal] = useState(false);
  const closeEditModal = () => {
    setEditModal(false);
    setHistoriaSelecionada(null);
  };

  const showEditModal = (historia) => {
    setEditModal(true);
    setHistoriaSelecionada(historia);
  };
  async function toastStory() {
    const response = await serviceCriarHistoria(id, novaHistoria);
    if (response) {
      closeCreateModal();
      toast("História Criada");
    } else {
      toast("Houve um problema ao cadastrar a história!");
    }
  }

  async function handleEditClick() {
    const response = await serviceAtualizarHistoria(id, historiaSelecionada);
    if (response) {
      closeEditModal();
      toast("Sala Editada");
    } else {
      toast("Houve um problema ao editar!");
    }
  }

  if (createModal) {
    createHistoryModal = (
      <FormCreateHistory
        onClose={closeCreateModal}
        modalHeader="Criar a História"
        onClick={closeCreateModal}
        onClickBtn={toastStory}
        lBtnText="Cancelar"
        rBtnText="Criar"
        novaHistoria={novaHistoria}
        setNovaHistoria={setNovaHistoria}
      />
    );
  }

  if (editModal) {
    editHistoryModal = (
      <FormEditHistory
        historiaSelecionada={historiaSelecionada}
        setHistoriaSelecionada={setHistoriaSelecionada}
        onClose={closeEditModal}
        modalHeader="Editar a Sala"
        onClick={closeEditModal}
        onClickBtn={handleEditClick}
        lBtnText="Sair"
        rBtnText="Editar"
      />
    );
  }

  function criarHistoria() {
    return {
      id: "2342334s-9c53-46e2-9f6a-e12sds33f6194",
      idsala: "16ece314-9ee1-4c88-96e5-c696c9a346dd",
      nome: "",
      votos: [],
      emAberto: true,
    };
  }
  return (
    <>
      <Box
        background="transparent"
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
            <Metodologia />
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
              {createHistoryModal}
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
                    showCreateModal();
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
                            {editHistoryModal}
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
