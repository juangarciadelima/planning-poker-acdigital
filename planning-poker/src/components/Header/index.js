import { Flex, Box, Spacer, Heading, Image, Avatar } from "@chakra-ui/react";
import React from "react";
import "./Header.css";
import ACLogo from "../../images/Ac digital.png";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      padding={3}
      bg="gray.100"
      borderBottom="1px solid"
      borderBottomWidth="hairline"
      borderBottomColor="#FF2E34"
    >
      <Box p="0" ml="5rem">
        <Heading>
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
        </Heading>
      </Box>
      <Spacer />
      <Spacer />
      <Box d="flex" mr="7rem">
        <Heading
          d="flex"
          marginRight="10px"
          textTransform=""
          justifyContent="center"
          alignItems="center"
          fontWeight="500"
          fontFamily="Poppins"
          textAlign="center"
          fontSize="lg"
        >
          Name of Person
        </Heading>
        <Avatar
          size="xl"
          src="https://bit.ly/dan-abramov"
          _hover={{
            boxShadow: "md",
          }}
        />
      </Box>
    </Flex>
  );
}
