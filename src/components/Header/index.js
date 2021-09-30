import {
  Flex,
  Box,
  Spacer,
  Heading,
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React from "react";
import "./Header.css";
import ACLogo from "../../Images/ACLogo.png";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      padding={3}
      bg="gray.100"
      borderBottom="1px solid"
      borderBottomWidth="hairline"
      borderBottomColor="#FF2E34"
      className="header"
      position="relative"
      w="100%"
    >
      <Box ml="3rem" width="10%" height="10%" cursor="pointer">
        <img src={ACLogo} />
      </Box>

      <Spacer />
      <Spacer />
      <Box d="flex" mr="7rem" className="imgBox">
        <Text fontSize="lg" fontWeight="500" fontFamily="Poppins">
          Seja bem Vindo, <strong>Juan Garcia</strong>
        </Text>
      </Box>
    </Flex>
  );
}
