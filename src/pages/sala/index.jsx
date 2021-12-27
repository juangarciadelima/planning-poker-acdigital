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
    <div className="grid">
      <Grid
        marginRight="5rem"
        templateColumns="1.75fr 1fr"
        gap={2}
        className="gridCustom"
      >
        <Box
          background="transparent"
          marginTop="2rem"
          w="100%"
          h="auto"
          className="box"
          marginRight="2rem"
          d="flex"
          justifyContent="center"
        >
          <Grid templateRows="0.4fr 1.5fr 0.5fr" gap={8} className="gridOne">
            <Box w="100%">
              <Heading>
                {historias[0] ? historias[0].nome : "Ainda não há historias"}
              </Heading>
            </Box>

            <Box className="boxCard" w="100%">
              <Metodologia className={classCarta} />
            </Box>
            <Box
              h="200px"
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
    </div>
  );
}
