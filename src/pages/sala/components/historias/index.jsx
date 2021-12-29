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
  serviceAtualizarHistoria,
  serviceCriarHistoria,
  serviceDeletarHistoria,
} from "../../../../services/historias";
import FormEditHistory from "../../../../components/forms/formEditHistory";
import FormDeleteHistory from "../../../../components/forms/deleteFormHistory";
import { useRoomsContext } from "../../../../context";

export default function Historias({ idSala }) {
  const { historiasAbertas, historiasFechadas, atualizarTodaSala } =
    useRoomsContext();

  const [novaHistoria, setNovaHistoria] = useState();
  const [historiaDeletar, setHistoriaDeletar] = useState();
  const [historiaEditar, setHistoriaEditar] = useState();

  useEffect(async () => {
    await atualizarTodaSala(idSala);
  }, []);

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
      await atualizarTodaSala(idSala);
    } else {
      toast("Houve um problema ao cadastrar a história!");
    }
  }

  const [editModal, setEditModal] = useState(false);
  const closeEditModal = () => {
    setEditModal(false);
    setHistoriaEditar(null);
  };

  const showEditModal = (historia) => {
    setEditModal(true);
    setHistoriaEditar(historia);
  };

  async function handleEditClick() {
    const response = await serviceAtualizarHistoria(historiaEditar);
    if (response) {
      closeEditModal();
      toast("História Editada");
      await atualizarTodaSala(idSala);
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
      await atualizarTodaSala(idSala);
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
        historiaEditar={historiaEditar}
        setHistoriaEditar={setHistoriaEditar}
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
                {historiasAbertas.length > 0 &&
                  historiasAbertas.map((historia) => (
                    <Tr>
                      <Td>{historia.nome}</Td>
                      <Td isNumeric>
                        {localStorage.getItem("tipoUsuario") ===
                          "administrador" && (
                          <ButtonGroup>
                            <IconButton
                              colorScheme="red"
                              onClick={() => {
                                showDeleteModal(historia.id);
                              }}
                              icon={<DeleteIcon />}
                            />
                            <IconButton
                              onClick={() => showEditModal(historia)}
                              icon={<EditIcon />}
                            />
                          </ButtonGroup>
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="striped" colorScheme="red" className="tableGrid">
              <Thead>
                <Th></Th>
                <Th isNumeric></Th>
              </Thead>
              <Tbody>
                {historiasFechadas.length > 0 &&
                  historiasFechadas.map((historia) => {
                    const votos = historia.votos;
                    let mediaVotos = 0;
      
                    votos.map((voto) => {
                      if (voto.carta.tipo !== "cafe") {
                        let votoJogador = voto.carta.valor;
                        mediaVotos = mediaVotos + votoJogador;
                      }
                    });

                    return (
                      <Tr>
                        <Td>{historia.nome}</Td>
                        <Td isNumeric>{Math.round((mediaVotos / votos.length) * 10) / 10}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {deleteHistoryModal}
      {editHistoryModal}
    </>
  );
}
