import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/layout";
import { buscarCartas } from "../../../../../services/metodologia";

export function Metodologia() {
  const [metodologia, setMetodologia] = useState({});

  useEffect(async () => {
    const res = await buscarCartas();
    setMetodologia(res);
  }, []);

  return (
    <Box className="boxCard">
      {metodologia && metodologia.cartas ? (
        metodologia.cartas.map((card) => (
          <Box className="cardBox">
            <Box className="card">
              <Heading
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                fontWeight="light"
                fontSize="30px"
                fontFamily="Poppins"
              >
                {card.valor}
              </Heading>
              <span className="numCardR">{card.valor}</span>
              <span className="numCardL">{card.valor}</span>
            </Box>
          </Box>
        ))
      ) : (
        <Heading>Loading...</Heading>
      )}
    </Box>
  );
}
