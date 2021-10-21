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
import { enterRoom } from "../../services/rooms";

export default function TableComponent({
  array,
  deleteModal,
  editModal,
  funcDel,
  funcEdit,
}) {
  const { rooms, room, setRoom } = useRoomsContext();

  const history = useHistory();
  async function enterCardRoom(id) {
    const res = await enterRoom(id);
    setRoom(res);
    console.log(room);
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
          {rooms.map((room) => (
            <Tr key={room.id}>
              <Td>{room.nome}</Td>
              <Td>{room.administrador.nome}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    enterCardRoom(room.id);
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
