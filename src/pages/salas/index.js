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
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../../components/table";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRoomsContext } from "../../context";
import { serviceBuscarSalas, serviceAlterarSala, serviceCriarSala } from "../../services/salas";

export default function Salas() {
  const history = useHistory();
  const { usuario, setSalas, salas } = useRoomsContext();

  const [salaSelecionada, setSalaSelecionada] = useState()
  const [novaSala, setNovaSala] = useState()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => { setIsModalVisible(false); setNovaSala(null)};
  const showModal = () => { setIsModalVisible(true); setNovaSala(criarSala()) };

  const [editModalVisible, setEditModalVisible] = useState(false);
  const closeEditModal = () => { setEditModalVisible(false); setSalaSelecionada(null)};
  const showEditModal = (sala) => { setEditModalVisible(true); setSalaSelecionada(sala)};

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const closeDeleteModal = () => setIsDeleteModalVisible(false);
  const showDeleteModal = () => setIsDeleteModalVisible(true);

  async function handleClick() {
    const response = await serviceCriarSala(novaSala)
    if(response){
      closeModal();
      toast("Sala Criada");
      await atualizarSalas()
    }else{
      toast("Houve um problema ao cadastrar a sala!");
    }
  }

  async function handleEditClick() {
    const response = await serviceAlterarSala(salaSelecionada)
    if(response){
      closeEditModal();
      toast("Sala Editada");
      await atualizarSalas()
    }else{
      toast("Houve um problema ao editar!");
    }
  }

  function handleDeleteClick() {
    closeDeleteModal();
    toast("Sala Deletada");
  }

  useEffect(async () => {
    if (!usuario.nome) {
      history.push("/");
    } else {
      await atualizarSalas()
    }
  }, []);

  async function atualizarSalas(){
    const response = await serviceBuscarSalas(usuario.email);
    setSalas(response);
  }

  function criarSala(){
    return {
      nome: "",
      jogadores: [],
      administrador: {
          "id": "01a98112-27b2-425f-97aa-7148da3e8644",
          "email": "jaderson.chefe@acdigital.com.br",
          "nome": "Jaderson Rosa"
      }
    }
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
          margin: "3rem",
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