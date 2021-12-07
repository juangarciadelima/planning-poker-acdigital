import React from "react";

import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
} from "@elastic/eui";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function FormDeleteHistory({
  onClose,
  modalHeader,
  onClick,
  onClickBtn,
  lBtnText,
  rBtnText,
}) {
  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{modalHeader}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <FormControl id="room-name " isRequired>
          <FormLabel>Você deseja mesmo deletar a sala?</FormLabel>
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
