import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { buscarCartas } from "../../../../services/metodologia";
import { GiPokerHand } from "react-icons/gi";
import { useRoomsContext } from "../../../../context";
import { votar } from "../../../../services/historias";

export function Metodologia({ className }) {
  const [metodologia, setMetodologia] = useState({});
  const { jogador } = useRoomsContext();

  const [voto, setVoto] = useState({
    carta: { tipo: "", valor: "" },
    jogador: { nome: "", email: "" },
  });

  useEffect(async () => {
    const res = await buscarCartas();
    setMetodologia(res);
  }, []);

  async function executarVoto(card) {
    setVoto({
      carta: { tipo: card.tipo, valor: card.valor },
      jogador: { nome: jogador.nome, email: jogador.email },
    });
    await votar(voto);
  }
  return (
    <Box className="boxCard">
      {metodologia && metodologia.cartas ? (
        metodologia.cartas.map((card) => (
          <Box className="cardBox">
            <Box
              className="card"
              onClick={() => {
                executarVoto(card);
              }}
            >
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
