import React, { useState, useEffect } from "react";
import "./cardRoom.css";

import { Grid, Box, Heading, Text } from "@chakra-ui/react";

import { useHistory, useParams } from "react-router-dom";

import { useRoomsContext } from "../../context";

import { Metodologia } from "./components/metodologia";
import Historias from "./components/historias";
import PlayerGrid from "./playerGrid";
import { buscarHistoriaAberta } from "../../services/historias";

export default function CardRoom() {
  const { administrador, sala } = useRoomsContext();

  const history = useHistory();
  const [historias, setHistorias] = useState([]);
  const [classCarta, setClassCarta] = useState("cartaVirada");
  const { id } = useParams();

  const buttonContent = (
    <Heading fontSize="2xl" fontFamily="Poppins" fontWeight="light">
      Convide os seus colegas
    </Heading>
  );

  useEffect(async () => {
    const res = await buscarHistoriaAberta(id, "true");
    setHistorias(res);
  }, []);

  return (
    <Grid
      padding="15px"
      templateColumns="2fr 1fr"
      className="gridCustom"
    >
      <Box
        background="transparent"
        marginTop="2rem"
        w="100%"
        h="auto"
        className="wrapper-box"
        marginRight="2rem"
        d="flex"
      >
        <Grid className="gridOne">
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
        </Grid>
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
