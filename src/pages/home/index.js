import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { editFormSample } from "../../components/forms/editForm";
import { Button } from "@chakra-ui/react";
import FormSample from "../../components/forms/formSample.js";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus } from "react-icons/ai";
import { EuiConfirmModal } from "@elastic/eui";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../../components/table/";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRoomsContext } from "../../contexts";
import { buscarSalas } from "../../services/rooms";

export default function TableTop() {
  const history = useHistory();
  const { usuario, setSalas, salas } = useRoomsContext();

  useEffect(async () => {
    if (!usuario.nome) {
      history.push("/");
    } else {
      const res = await buscarSalas(usuario.email);
      setSalas(res);
    }
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const closeEditModal = () => setEditModalVisible(false);
  const showEditModal = () => setEditModalVisible(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const closeDeleteModal = () => setIsDeleteModalVisible(false);
  const showDeleteModal = () => setIsDeleteModalVisible(true);

  function handleClick() {
    closeModal();

    toast("Sala Criada");
  }

  function handleEditClick() {
    closeEditModal();

    toast("Sala Editada");
  }

  function handleDeleteClick() {
    closeDeleteModal();

    toast("Sala Deletada");
  }

  function handleChangeNome(e) {}

  let modal;
  let deleteModal;
  let editModal;

  if (editModalVisible) {
    editModal = (
      <FormSample
        onClose={closeEditModal}
        modalHeader="Editar a Sala"
        modalBody={editFormSample}
        onClick={closeEditModal}
        onClickBtn={handleEditClick}
        lBtnText="Sair"
        rBtnText="Editar"
      />
    );
  }

  if (isDeleteModalVisible) {
    deleteModal = (
      <EuiConfirmModal
        title="Deletar a Sala"
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteClick}
        cancelButtonText="Sair"
        className="cancelText"
        confirmButtonText="Deletar"
        buttonColor="danger"
        defaultFocusedButton="confirm"
      >
        Você deseja apagar mesmo a sala?
      </EuiConfirmModal>
    );
  }

  if (isModalVisible) {
    modal = (
      <FormSample
        onClose={closeModal}
        modalHeader="Criar a Sala"
        modalBody={
          <FormControl id="room-name " isRequired>
            <FormLabel>Nome da Sala</FormLabel>
            <Input placeholder="Nome da Sala" />
          </FormControl>
        }
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
          margin: "3rem",
        }}
      >
        <Button
          title="Create Room"
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
        {modal}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
        />
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
