import React, { useState, useEffect } from "react";
import "./cardRoom.css";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../context";
import { Metodologia } from "./components/metodologia";
import Historias from "./components/historias";
import PlayerGrid from "./playerGrid";
import { buscarHistoriaAberta } from "../../services/historias";
import { serviceBuscarSala } from "../../services/salas";
import poll from "easy-polling"


export default function CardRoom() {
  const { sala, setSala } = useRoomsContext();

  const [historias, setHistorias] = useState([]);
  const [classCarta, setClassCarta] = useState("cartaVirada");
  const { id } = useParams();

  const buttonContent = (
    <Heading fontSize="2xl" fontFamily="Poppins" fontWeight="light">
      Convide os seus colegas
    </Heading>
  );

  const executarPollingAtualizarSala = async(id) => {
    poll(
      async() => await serviceBuscarSala(id),
      (sala) => {
        setSala(sala)
      },
      2000, 
      900000000000000000
    )
  }

  useEffect(async() => {

    await executarPollingAtualizarSala(id)

    const historias = await buscarHistoriaAberta(id, "true");
    setHistorias(historias);

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
              {historias[0] ? historias[0].nome : "Ainda não há historias"}
            </Heading>
          </Box>

          <Box className="boxCard" w="100%">
            <Metodologia className={classCarta} />
          </Box>
          <Box
            w="100%"
            justifyContent="center"
            alignItems="center"
            marginBottom="3rem"
            className="tabBox"
          >
            <Historias
              id={sala.id}
              historias={historias}
              setHistorias={setHistorias}
            />
          </Box>
        </Box>
      </Box>
      <PlayerGrid
        buttonContent={buttonContent}
        sala={sala}
        setClassCarta={setClassCarta}
        historias={historias}
      />
    </Grid>
  );
}
