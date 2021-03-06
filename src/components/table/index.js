import React from "react";
import { useHistory } from "react-router";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  ButtonGroup,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { EditIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";
import { useRoomsContext } from "../../context";
import { serviceBuscarSala } from "../../services/salas";

export default function TableComponent({
  salas,
  deleteModal,
  editModal,
  funcDel,
  funcEdit,
}) {
  const { setSala, polling } = useRoomsContext();

  function copiarLink(id) {
    const urlConviteJogador = `${window.location.href}sala/${id}/jogador`;
    navigator.clipboard.writeText(urlConviteJogador);
  }

  const history = useHistory();

  async function enterCardRoom(id) {
    const sala = await serviceBuscarSala(id);
    setSala(sala);
    history.push(`/sala/${id}`);
  }

  return (
    <Box
      w="100%"
      marginTop="0rem"
      alignItems="center"
      justifyContent="center"
      p={5}
      d="flex"
    >
      <Table
        variant="striped"
        size="lg"
        colorScheme="red"
        style={{
          maxWidth: "80%",
        }}
        className="table"
      >
        <Thead>
          <Tr className="headerTableColor">
            <Th>Nome</Th>
            <Th>Criada por</Th>
            <Th>Sala</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salas.map((sala) => (
            <Tr key={sala.id}>
              <Td>{sala.nome}</Td>
              <Td>{sala.administrador.nome}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    polling.parar = false
                    enterCardRoom(sala.id);
                  }}
                >
                  Entrar na Sala
                </Button>
              </Td>
              <Td isNumeric>
                <ButtonGroup spacing="3">
                  <IconButton
                    title="Copiar Link"
                    aria-label="Copiar Link"
                    icon={<CopyIcon />}
                    colorScheme="red"
                    onClick={() => copiarLink(sala.id)}
                  />
                  <IconButton
                    aria-label="Deletar Sala"
                    icon={<CloseIcon />}
                    colorScheme="red"
                    onClick={() => funcDel(sala.id)}
                    title="Deletar Sala"
                  />
                  <IconButton
                    title="Editar Sala"
                    aria-label="Editar Sala"
                    icon={<EditIcon />}
                    colorScheme="gray"
                    onClick={() => funcEdit(sala)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Nome</Th>
            <Th>Criada por</Th>
            <Th>Tamanho</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Tfoot>
      </Table>
      {deleteModal}
      {editModal}
    </Box>
  );
}
