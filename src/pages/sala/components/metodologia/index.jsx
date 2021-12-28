import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { buscarCartas } from "../../../../services/metodologia";
import { FiCoffee } from "react-icons/fi";
import { useRoomsContext } from "../../../../context";
import { votar } from "../../../../services/historias";

export function Metodologia() {
  const [metodologia, setMetodologia] = useState({});
  const {
    administrador,
    jogador,
    historiaSelecionada,
    tipoUsuario,
    sala,
    atualizarTodaSala,
  } = useRoomsContext();
  const [cartaSelecionada, setCartaSelecionada] = useState();

  useEffect(async () => {
    const metodolodia = await buscarCartas();
    setMetodologia(metodolodia);
  }, []);

  async function executarVoto(carta) {
    let usuario = jogador;
    if (tipoUsuario === "administrador") {
      usuario = administrador;
    }
    let voto = {
      carta: { tipo: carta.tipo, valor: carta.valor },
      jogador: { nome: usuario.nome, email: usuario.email },
    };
    await votar(historiaSelecionada?.id, voto);
    setCartaSelecionada(carta);
    await atualizarTodaSala(sala.id);
  }

  return (
    <Box className="boxCard">
      {metodologia && metodologia.cartas ? (
        metodologia.cartas.map((carta) => (
          <Box className="cardBox">
            <Box
              className={
                carta.id === cartaSelecionada?.id ? "cardSelected" : "card"
              }
              onClick={async () => await executarVoto(carta)}
            >
              {carta.tipo == "cafe" ? (
                <>
                  <Heading
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    fontWeight="light"
                    fontSize="30px"
                    fontFamily="Poppins"
                  >
                    <FiCoffee />
                  </Heading>
                  <span className="numCardR">
                    <FiCoffee />
                  </span>
                  <span className="numCardL">
                    <FiCoffee />
                  </span>
                </>
              ) : (
                <>
                  <Heading
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    fontWeight="light"
                    fontSize="30px"
                    fontFamily="Poppins"
                  >
                    {carta.valor}
                  </Heading>
                  <span className="numCardR">{carta.valor}</span>
                  <span className="numCardL">{carta.valor}</span>
                </>
              )}
            </Box>
          </Box>
        ))
      ) : (
        <Heading>Loading...</Heading>
      )}
    </Box>
  );
}
