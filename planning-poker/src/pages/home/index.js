import React, { useState } from "react";
import { editFormSample } from "../forms/editForm.js.js";
import { Button } from "@chakra-ui/react";
import FormSample from "../forms/formSample.js.js.js.js";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus } from "react-icons/ai";
import { EuiConfirmModal } from "@elastic/eui";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../table/table.jsx.js";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function TableTop() {
  const roomInformations = [
    {
      name: "Sala Teste 1",
      size: 5,
      createdBy: "Juan Garcia de Lima",
    },
  ];

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

  let modal;
  let deleteModal;
  let editModal;

  if (editModalVisible) {
    editModal = (
      <FormSample
        onClose={closeEditModal}
        modalHeader="Edit the Room"
        modalBody={editFormSample}
        onClick={closeEditModal}
        onClickBtn={handleEditClick}
        lBtnText="Exit"
        rBtnText="Edit"
      />
    );
  }

  if (isDeleteModalVisible) {
    deleteModal = (
      <EuiConfirmModal
        title="Delete Room"
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteClick}
        cancelButtonText="No"
        confirmButtonText="Yes"
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
        modalHeader="Create your Room"
        modalBody={
          <FormControl id="room-name " isRequired>
            <FormLabel>Name of Room</FormLabel>
            <Input placeholder="Name" />
          </FormControl>
        }
        onClick={closeModal}
        onClickBtn={handleClick}
        lBtnText="Cancel"
        rBtnText="Create"
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
          Create Room
        </Button>
        {modal}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
        />
      </div>
      <TableComponent
        array={roomInformations}
        deleteModal={deleteModal}
        editModal={editModal}
        funcDel={showDeleteModal}
        funcEdit={showEditModal}
      />
    </>
  );
}
