import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { buscarCartas } from "../../../../services/metodologia";
import { FiCoffee } from "react-icons/fi";
import { useRoomsContext } from "../../../../context";
import { serviceAtualizarHistoria } from "../../../../services/historias";
import { toast } from "react-toastify";

export function Metodologia() {
  const [metodologia, setMetodologia] = useState({});
  const {
    administrador,
    jogador,
    historiaSelecionada,
    tipoUsuario,
    sala,
    atualizarTodaSala,
    historiasAbertas,
    cartaSelecionada,
    setCartaSelecionada,
  } = useRoomsContext();

  useEffect(async () => {
    const metodolodia = await buscarCartas();
    setMetodologia(metodolodia);
  }, []);

  async function executarVoto(carta) {
    if (historiaSelecionada && historiasAbertas.length > 0) {
      let usuario = administrador ?? jogador;

      let voto = {
        carta: { tipo: carta.tipo, valor: carta.valor },
        jogador: { nome: usuario.nome, email: usuario.email },
      };

      let editarHistoria = historiaSelecionada;
      editarHistoria.votos = editarHistoria.votos.filter(
        (item) => item.jogador.email !== usuario.email && item.email !== ""
      );
      editarHistoria.votos.push(voto);

      //o voto ocorre no editar a historia
      await serviceAtualizarHistoria(editarHistoria);
      setCartaSelecionada(carta);
      await atualizarTodaSala(sala.id);
    } else {
      toast("Para votar o Administrador precisa cadastrar uma história");
    }
  }

  const MediaPontos = () => {
    if (historiaSelecionada) {
      const votos = historiaSelecionada.votos;
      let mediaVotos = 0;
      let votosIgnorados = 0;

      votos.length > 0 &&
        votos.map((voto) => {
          if (voto.carta.tipo !== "cafe") {
            let votoJogador = voto.carta.valor;
            mediaVotos = mediaVotos + votoJogador;
          } else {
            votosIgnorados = votosIgnorados + 1;
          }
        });
      return (
        <Heading>
          Média de pontos:{" "}
          {votos.length > 0
            ? Math.round((mediaVotos / (votos.length - votosIgnorados)) * 10) /
              10
            : 0}
        </Heading>
      );
    }
    return <Heading>Carregando ...</Heading>;
  };

  return (
    <Box className="boxCard">
      {metodologia && metodologia.cartas && sala && !sala.revelarVotos ? (
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
        <MediaPontos />
      )}
    </Box>
  );
}
