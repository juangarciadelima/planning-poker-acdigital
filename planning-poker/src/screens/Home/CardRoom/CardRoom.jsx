import React from 'react'
import './cardRoom.css'
import { Grid, Box, Text } from '@chakra-ui/react'

export default function CardRoom() {
  return (
    <div className="grid">
      <Grid
        marginRight="1rem"
        marginLeft="1rem"
        templateColumns="repeat(2,1fr)"
        gap={4}
      >
        <Box marginTop="1rem" w="100%" h="750px" bg="blue.700">
          <Grid templateRows="0.2fr 1.5fr 0.2fr" gap={10} marginTop="2rem">
            <Box bg="cyan" textAlign="center" d="flex" m alignItems="center">
              <Text marginLeft="1rem" fontSize="2xl">
                Header
              </Text>
            </Box>
            <Box
              bg="red"
              h="500px"
              d="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="left"
            >
              <Text fontSize="2xl">Cards</Text>
            </Box>
            <Box
              bg="yellow"
              height="70px"
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="2xl">Stories</Text>
            </Box>
          </Grid>
        </Box>
        <Box marginTop="1rem" w="100%" h="700px" bg="blue.700">
          <Text color="white" fontSize="3xl">
            Name of Room
          </Text>
        </Box>
      </Grid>
    </div>
  )
}
