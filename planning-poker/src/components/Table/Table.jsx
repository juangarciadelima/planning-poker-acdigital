import React, { useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Center,
  ButtonGroup,
  IconButton
} from '@chakra-ui/react'

import '@elastic/eui/dist/eui_theme_amsterdam_light.css'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import {
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiButton
} from '@elastic/eui'
import './table.css'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { EditIcon, CloseIcon } from '@chakra-ui/icons'
export default function TableTop() {
  const [room, setRoom] = useState('')
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const closeModal = () => setIsModalVisible(false)

  const showModal = () => setIsModalVisible(true)

  function handleClick() {
    closeModal()

    toast('Sala Criada')
  }

  const formSample = (
    <form onSubmit={handleSubmit}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Create your Room</FormLabel>
        <Input
          type="text"
          placeholder="Room Name"
          onChange={e => setRoom(console.log(e.target.value))}
        />
      </FormControl>
    </form>
  )

  let modal

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>Create a Room</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>{formSample}</EuiModalBody>
        <EuiModalFooter>
          <EuiButton onClick={closeModal} color="danger">
            Cancel
          </EuiButton>
          <EuiButton
            type="submit"
            form="modalFormId"
            onClick={handleClick}
            fill
            color="danger"
          >
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    )
  }

  return (
    <>
      <div
        style={{
          textAlign: 'right',
          margin: '3rem'
        }}
      >
        <Button
          leftIcon={<AiOutlinePlus />}
          size="md"
          bg="#be282c"
          color="white"
          _hover={{
            background: '#a62327'
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
            maxWidth: '80%'
          }}
        >
          <TableCaption>Rooms</TableCaption>
          <Thead>
            <Tr>
              <Th color="#EA4C46">Name</Th>
              <Th color="#EA4C46">Created by</Th>
              <Th color="#EA4C46">Size</Th>
              <Th color="#EA4C46" isNumeric>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Sala Teste 1</Td>
              <Td>Juan Garcia</Td>
              <Td>0/5</Td>
              <Td isNumeric>
                <ButtonGroup spacing="3">
                  <IconButton
                    aria-label="Delete"
                    icon={<CloseIcon />}
                    colorScheme="red"
                  />
                  <IconButton
                    aria-label="Edit Room"
                    icon={<EditIcon />}
                    colorScheme="gray"
                  />
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td>Sala Teste 2</Td>
              <Td>Juan Garcia</Td>
              <Td>0/5</Td>
              <Td isNumeric>
                <ButtonGroup spacing="3">
                  <IconButton
                    aria-label="Delete"
                    icon={<CloseIcon />}
                    colorScheme="red"
                  />
                  <IconButton
                    aria-label="Edit Room"
                    icon={<EditIcon />}
                    colorScheme="gray"
                  />
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td>Sala Teste 3</Td>
              <Td>Juan Garcia</Td>
              <Td>0/5</Td>
              <Td isNumeric>
                <ButtonGroup spacing="3">
                  <IconButton
                    aria-label="Delete"
                    icon={<CloseIcon />}
                    colorScheme="red"
                  />
                  <IconButton
                    aria-label="Edit Room"
                    icon={<EditIcon />}
                    colorScheme="gray"
                  />
                </ButtonGroup>
              </Td>
            </Tr>
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
    </>
  )
}
