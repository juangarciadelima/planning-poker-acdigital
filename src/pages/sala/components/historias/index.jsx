import React, { useState, useEffect } from "react";
import "../../cardRoom.css";
import {
  Box,
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
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { EuiNotificationBadge } from "@elastic/eui";
import { toast } from "react-toastify";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import FormCreateHistory from "../../../../components/forms/formCreateHistory";
import {
  buscarHistorias,
  serviceAtualizarHistoria,
  serviceCriarHistoria,
  serviceDeletarHistoria,
} from "../../../../services/historias";
import FormEditHistory from "../../../../components/forms/formEditHistory";
import FormDeleteHistory from "../../../../components/forms/deleteFormHistory";
import { useRoomsContext } from "../../../../context";

export default function Historias({ idSala }) {

  const { 
     historiaSelecionada,
     setHistoriaSelecionada, 
     historiasAbertas, 
     historiasFechadas,
     atualizarHistorias
  } = useRoomsContext()
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

  async function handleClickCriarHistoria() {
    const response = await serviceCriarHistoria(novaHistoria);
    if (response) {
      closeCreateModal();
      toast("História Criada");
      await atualizarHistorias(idSala);
    } else {
      toast("Houve um problema ao cadastrar a história!");
    }
  }

  const [editModal, setEditModal] = useState(false);
  const closeEditModal = () => {
    setEditModal(false);
    setHistoriaSelecionada(null);
  };

  const showEditModal = (historia) => {
    setEditModal(true);
    setHistoriaSelecionada(historia);
  };

  async function handleEditClick() {
    const response = await serviceAtualizarHistoria();
    if (response) {
      closeEditModal();
      toast("História Editada");
      await atualizarHistorias(idSala);
    } else {
      toast("Houve um problema ao editar!");
    }
  }

  const [deleteModal, setDeleteModal] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setHistoriaDeletar(null);
  };
  const showDeleteModal = (historia) => {
    setDeleteModal(true);
    setHistoriaDeletar(historia);
  };

  let createHistoryModal;
  let editHistoryModal;
  let deleteHistoryModal;

  async function handleDeleteClick() {
    const response = await serviceDeletarHistoria(historiaDeletar);
    if (response) {
      closeDeleteModal();
      toast("História Deletada");
      await atualizarHistorias(idSala);
    } else {
      toast("Houve um problema ao deletar!");
    }
  }

  if (createModal) {
    createHistoryModal = (
      <FormCreateHistory
        onClose={closeCreateModal}
        modalHeader="Criar a História"
        onClick={closeCreateModal}
        onClickBtn={handleClickCriarHistoria}
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

  if (deleteModal) {
    deleteHistoryModal = (
      <FormDeleteHistory
        onClose={closeDeleteModal}
        modalHeader="Deletar a Sala"
        lBtnText="Sair"
        rBtnText="Deletar"
        onClick={closeDeleteModal}
        onClickBtn={handleDeleteClick}
      />
    );
  }
  function criarHistoria() {
    return {
      idSala: idSala,
      nome: "",
      votos: [],
      emAberto: true,
    };
  }

  return (
    <>
      <Tabs className="tab" size="md" variant="line" position="relative">
        {createHistoryModal}
        <TabList>
          <Tab>
            Histórias Abertas
            <Box marginLeft="10px">
              <EuiNotificationBadge className="tabBadge">
                {historiasAbertas.length}
              </EuiNotificationBadge>
            </Box>
          </Tab>
          <Tab>
            Histórias Fechadas
            <Box marginLeft="10px">
              <EuiNotificationBadge>
                {historiasFechadas.length}
              </EuiNotificationBadge>
            </Box>
          </Tab>
          {localStorage.getItem("tipoUsuario") !== "jogador" && (
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
          )}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="striped" colorScheme="red" className="tableGrid">
              <Thead>
                <Th></Th>
                <Th isNumeric></Th>
              </Thead>
              <Tbody>
                {historiasAbertas.length > 0 && historiasAbertas.map((history) => (
                  <Tr>
                    <Td>{history.nome}</Td>
                    <Td isNumeric>
                      {localStorage.getItem("tipoUsuario") == "jogador" ? (
                        ""
                      ) : (
                        <ButtonGroup>
                          <IconButton
                            colorScheme="red"
                            onClick={() => {
                              showDeleteModal(history.id);
                            }}
                            icon={<DeleteIcon />}
                          />
                          {deleteHistoryModal}
                          <IconButton
                            onClick={() => showEditModal(history)}
                            icon={<EditIcon />}
                          />
                          {editHistoryModal}
                        </ButtonGroup>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            {" "}
            <Table variant="striped" colorScheme="red" className="tableGrid">
              <Thead>
                <Th></Th>
                <Th isNumeric></Th>
              </Thead>
              <Tbody>
                {historiasFechadas.length > 0 && historiasFechadas.map((history) => (
                  <Tr>
                    <Td>{history.nome}</Td>
                    <Td isNumeric></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
