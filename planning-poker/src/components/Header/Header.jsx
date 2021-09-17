import { Flex, Box, Spacer, Heading, Image, Avatar } from '@chakra-ui/react'
import React from 'react'
import './Header.css'
import ACLogo from '../../images/Ac digital.png'

export default function header() {
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
          />
        </Heading>
      </Box>
      <Spacer />
      <Spacer />
      <Box d="flex" mr="7rem">
        <Avatar
          size="lg"
          src="https://bit.ly/dan-abramov"
          _hover={{
            boxShadow: 'md'
          }}
        />
      </Box>
    </Flex>
  )
}
