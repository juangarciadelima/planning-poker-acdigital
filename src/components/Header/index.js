import { Flex, Box, Spacer, Heading, Image, Avatar } from "@chakra-ui/react";
import React from "react";
import "./Header.css";
import ACLogo from "../../Images/Ac digital.png";
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
    >
      <Box p="0" ml="5rem" className="imgBox">
        <Image
          marginLeft="2rem"
          boxSize="5rem"
          src={ACLogo}
          alt="Logo"
          objectFit="cover"
          cursor="pointer"
          transition="0.3s ease"
          onClick={() => {
            history.push("/home");
          }}
          _hover={{ transform: "translate3d(0px, -5px, 0px)" }}
        />
      </Box>
      <Spacer />
      <Spacer />
      <Box d="flex" mr="7rem" className="imgBox">
        <Box
          backgroundColor="gray.500"
          w="5rem"
          h="5rem"
          borderRadius="50%"
        ></Box>
      </Box>
    </Flex>
  );
}
