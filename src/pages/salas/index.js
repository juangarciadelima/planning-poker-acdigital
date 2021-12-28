import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import FormEdit from "../../components/forms/formEdit";
import FormCreate from "../../components/forms/formCreate";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus } from "react-icons/ai";
import { EuiConfirmModal } from "@elastic/eui";
import "./salas.css";
import { toast } from "react-toastify";
import TableComponent from "../../components/table";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRoomsContext } from "../../context";
import {
  serviceBuscarSalas,
  serviceAlterarSala,
  serviceCriarSala,
  serviceDeletarSala,
} from "../../services/salas";
import DeleteForm from "../../components/forms/deleteForm";

//State that picks the room when click on deleteModal
export default function Salas() {
  const { setSalas, salas } = useRoomsContext();

  const administrador = JSON.parse(localStorage.getItem("administrador"));

  const history = useHistory();

  const [salaSelecionada, setSalaSelecionada] = useState();
  const [salaDeletar, setSalaDeletar] = useState();

  const [novaSala, setNovaSala] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false);
    setNovaSala(null);
  };
  const showModal = () => {
    setIsModalVisible(true);
    setNovaSala(criarSala());
  };

  const [editModalVisible, setEditModalVisible] = useState(false);
  const closeEditModal = () => {
    setEditModalVisible(false);
    setSalaSelecionada(null);
  };
  const showEditModal = (sala) => {
    setEditModalVisible(true);
    setSalaSelecionada(sala);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSalaDeletar(null);
  };
  const showDeleteModal = (id) => {
    setIsDeleteModalVisible(true);
    setSalaDeletar(id);
    //Pick the room to delete from the table  and set it to the state to be deleted in the modal  and show the modal  to confirm
  };

  useEffect(async () => {
    if (administrador) {
      const response = await serviceBuscarSalas(administrador?.email);
      setSalas(response);
    }
  }, []);

  async function handleClick() {
    const response = await serviceCriarSala(novaSala);
    if (response) {
      closeModal();
      toast("Sala Criada");
      await atualizarSalas();
    } else {
      toast("Houve um problema ao cadastrar a sala!");
      await atualizarSalas();
    }
  }

  async function handleEditClick() {
    const response = await serviceAlterarSala(salaSelecionada);
    if (response) {
      closeEditModal();
      toast("Sala Editada");
      await atualizarSalas();
    } else {
      toast("Houve um problema ao editar!");
    }
  }

  async function handleDeleteClick() {
    const response = await serviceDeletarSala(salaDeletar);
    //Pick the id of the room to delete from the state and delete it from the table

    if (response) {
      closeDeleteModal();
      toast(`Sala foi deletada com sucesso`);

      await atualizarSalas();
    } else {
      toast.warn("Houve um problema ao deletar!");
    }
  }

  async function atualizarSalas() {
    if (administrador) {
      const response = await serviceBuscarSalas(administrador?.email);
      setSalas(response);
    }
  }

  function criarSala() {
    return {
      nome: "",
      jogadores: [
        {
          email: administrador?.email,
          nome: administrador?.nome,
        }
      ],
      administrador: {
        email: administrador?.email,
        nome: administrador?.nome,
        id: administrador?.id,
      },
    };
  }

  let createModal;
  let deleteModal;
  let editModal;

  if (editModalVisible) {
    editModal = (
      <FormEdit
        salaSelecionada={salaSelecionada}
        setSalaSelecionada={setSalaSelecionada}
        onClose={closeEditModal}
        modalHeader="Editar a Sala"
        onClick={closeEditModal}
        onClickBtn={handleEditClick}
        lBtnText="Sair"
        rBtnText="Editar"
      />
    );
  }

  if (isDeleteModalVisible) {
    deleteModal = (
      <DeleteForm
        salaDeletar={salaDeletar}
        onClose={closeDeleteModal}
        modalHeader="Deletar a Sala"
        lBtnText="Sair"
        rBtnText="Deletar"
        onClick={closeEditModal}
        onClickBtn={handleDeleteClick}
      />
    );
  }

  if (isModalVisible) {
    createModal = (
      <FormCreate
        novaSala={novaSala}
        setNovaSala={setNovaSala}
        onClose={closeModal}
        modalHeader="Criar a Sala"
        onClick={closeModal}
        onClickBtn={handleClick}
        lBtnText="Cancelar"
        rBtnText="Criar"
      />
    );
  }

  return (
    <>
      <div
        style={{
          textAlign: "right",
          margin: "3rem 120px 0px",
        }}
      >
        <Button
          title="Criar Sala"
          leftIcon={<AiOutlinePlus />}
          size="md"
          bg="#be282c"
          color="white"
          _hover={{
            background: "#a62327",
          }}
          onClick={showModal}
        >
          Criar Sala
        </Button>
        {createModal}
      </div>
      <TableComponent
        salas={salas}
        deleteModal={deleteModal}
        editModal={editModal}
        funcDel={showDeleteModal}
        funcEdit={showEditModal}
      />
    </>
  );
}
