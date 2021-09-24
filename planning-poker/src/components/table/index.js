import React from "react";

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
} from "@chakra-ui/react";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
export default function TableComponent({
  array,
  deleteModal,
  editModal,
  funcDel,
  funcEdit,
}) {
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
        <TableCaption>Rooms</TableCaption>
        <Thead>
          <Tr className="headerTableColor">
            <Th>Name</Th>
            <Th>Created by</Th>
            <Th>Size</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {array.map((room) => (
            <Tr key={room.id}>
              <Td>{room.name}</Td>
              <Td>{room.createdBy}</Td>
              <Td>{room.size}</Td>
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
            <Th>Name</Th>
            <Th>Created by</Th>
            <Th>Size</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
}
