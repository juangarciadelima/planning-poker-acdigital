import React, { useState, useEffect } from "react";
import "./cardRoom.css";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../context";
import { Metodologia } from "./components/metodologia";
import Historias from "./components/historias";
import PlayerGrid from "./playerGrid";

export default function CardRoom() {
  const { sala, historiasAbertas, executarPollingAtualizarSala } = useRoomsContext();
  const { id } = useParams();

  useEffect(async() => {
    await executarPollingAtualizarSala(id)
  }, []);
  
  return (
    <Grid padding="15px" paddingBottom="60px" templateColumns="2fr 1fr" className="gridCustom">
      <Box
        background="transparent"
        marginTop="2rem"
        w="100%"
        h="auto"
        className="wrapper-box"
        marginRight="2rem"
        d="flex"
      >
        <Box className="gridOne">
          <Box w="100%">
            <Heading>
              {historiasAbertas.length > 0 ? historiasAbertas[0].nome : "Ainda não há historias"}
            </Heading>
          </Box>

          <Box className="boxCard" w="100%">
            <Metodologia/>
          </Box>
          <Box
            w="100%"
            justifyContent="center"
            alignItems="center"
            marginBottom="3rem"
            className="tabBox"
          >
            <Historias idSala={id}/>
          </Box>
        </Box>
      </Box>
      <PlayerGrid
        buttonContent={<Heading fontSize="2xl" fontFamily="Poppins" fontWeight="light">
                        Convide os seus colegas
                      </Heading>}
        jogadores={sala?.jogadores}
      />
    </Grid>
  );
}
