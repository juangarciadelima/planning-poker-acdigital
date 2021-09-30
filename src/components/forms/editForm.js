import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const editFormSample = (
  <form>
    <FormControl id="room-name " isRequired>
      <FormLabel>Nome da Sala</FormLabel>
      <Input placeholder="Nome" />
    </FormControl>
  </form>
);
