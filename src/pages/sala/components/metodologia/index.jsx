import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { buscarMetodologiaPorId } from "../../../../services/metodologia";
import { FiCoffee } from "react-icons/fi";
import { useRoomsContext } from "../../../../context";
import { votar } from "../../../../services/historias";
import { toast } from "react-toastify";
import { TiposVotos } from "../tipos-votos";
import { Card } from "../../../../components/card";

export function Metodologia() {
  const {
    metodologia,
    administrador,
    jogador,
    historiaSelecionada,
    tipoUsuario,
    sala,
    atualizarTodaSala,
    historiasAbertas,
    cartaSelecionada,
    setCartaSelecionada,
    setMetodologia,
  } = useRoomsContext();

  useEffect(async () => {
    const metodologia = await buscarMetodologiaPorId(
      sala?.metodologiaSelecionada
    );
    setMetodologia(metodologia);
  }, []);

  function executarVoto(carta) {
    //add a loader when vote is being executed with setTimeout webhook and remove it when it's done
    const loader = toast.loading("Processando voto");
    if (historiaSelecionada && historiasAbertas.length > 0) {
      setTimeout(async () => {
        let usuario = administrador ?? jogador;

        let voto = {
          carta: { tipo: carta.tipo, valor: carta.valor },
          jogador: { nome: usuario.nome, email: usuario.email },
        };
        await votar(historiaSelecionada.id, voto);
        toast.update(loader, {
          render: "Voto processado",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setCartaSelecionada(carta);
      }, 3000);
      loader;
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
          if (voto.carta.tipo === "numeros") {
            let votoJogador = voto.carta.valor;
            mediaVotos = mediaVotos + votoJogador;
          } else {
            votosIgnorados = votosIgnorados + 1;
          }
        });

      return (
        <Heading>
          {votos.some((element) => element.carta.tipo === "numeros") && (
            <Heading>
              <>Média de pontos: </>
              {votos.length > 0 && mediaVotos
                ? Math.round(
                    (mediaVotos / (votos.length - votosIgnorados)) * 10
                  ) / 10
                : 0}
            </Heading>
          )}

          <TiposVotos votos={votos} />
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
              {carta.tipo === "cafe" ? (
                <>
                  <Card valor={<FiCoffee />} />
                </>
              ) : (
                <>
                  <Card valor={carta.valor} />
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
