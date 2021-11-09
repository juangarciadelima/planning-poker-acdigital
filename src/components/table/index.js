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
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useRoomsContext } from "../../contexts";
import { entrarSala } from "../../services/rooms";

export default function TableComponent({
  array,
  deleteModal,
  editModal,
  funcDel,
  funcEdit,
}) {
  const { salas, sala, setSala } = useRoomsContext();

  const history = useHistory();
  async function enterCardRoom(id) {
    const res = await entrarSala(id);
    setSala(res);
    console.log(sala);
    history.push("/room");
  }
  return (
    <Box
      w="100%"
      marginTop="4rem"
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
        <TableCaption>Salas</TableCaption>
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
                    enterCardRoom(sala.id);
                  }}
                >
                  Entrar na Sala
                </Button>
              </Td>
              <Td isNumeric>
                <ButtonGroup spacing="3">
                  <IconButton
                    aria-label="Delete"
                    icon={<CloseIcon />}
                    colorScheme="red"
                    onClick={funcDel}
                    title="Delete Room"
                  />
                  {deleteModal}
                  <IconButton
                    title="Edit Room"
                    aria-label="Edit Room"
                    icon={<EditIcon />}
                    colorScheme="gray"
                    onClick={funcEdit}
                  />
                  {editModal}
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
    </Box>
  );
}