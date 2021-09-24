import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react";

export const editFormSample = (
  <form>
    <FormControl id="room-name " isRequired>
      <FormLabel>Name of Room</FormLabel>
      <Input placeholder="Name" />
      <FormLabel>Size of Room</FormLabel>
      <NumberInput placeholder="Size" max={5} min={1}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  </form>
);
