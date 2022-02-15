import React from "react";

import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
} from "@elastic/eui";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

export default function FormEdit({
  onClose,
  modalHeader,
  onClick,
  onClickBtn,
  lBtnText,
  rBtnText,
  salaSelecionada,
  setSalaSelecionada,
  metodologias,
}) {
  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{modalHeader}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <FormControl id="room-name " isRequired>
          <FormLabel>Nome da Sala</FormLabel>
          <Input
            placeholder="Nome"
            value={salaSelecionada?.nome}
            onChange={(e) => {
              setSalaSelecionada({
                ...salaSelecionada,
                ...{ nome: e.target?.value },
              });
            }}
          />
          <FormLabel marginTop="10px">Escolha seu deck</FormLabel>
          <Select
            placeholder="Selecione sua opção"
            onChange={(e) =>
              setSalaSelecionada({
                ...salaSelecionada,
                ...{ metodologiaSelecionada: e.target?.value },
              })
            }
          >
            {metodologias.map((metodologia) => (
              <option value={metodologia.id}>{metodologia.nome}</option>
            ))}
          </Select>
        </FormControl>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton onClick={onClick} color="danger">
          {lBtnText}
        </EuiButton>
        <EuiButton
          type="submit"
          form="modalFormId"
          onClick={onClickBtn}
          fill
          color="danger"
        >
          {rBtnText}
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
}
